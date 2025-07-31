import { AppDataSource } from '../../config/connection';
import { PaymentCredit } from '../../entity/ADM/PaymentCredit';
import { DeliverMedicationsPayment } from '../../entity/SERV/DeliveryMedicationsPayment';

const paymentCreditRepository = AppDataSource.getRepository(PaymentCredit);
const usedFoundsRepository = AppDataSource.getRepository(DeliverMedicationsPayment);

export class PaymentTransactions {

  static async createPayment(data: any) {
    try {
      //Buscamos y obtenemos todos los paymentCredit
      const paymentCreditActive = await paymentCreditRepository.createQueryBuilder('paymentCredit')
        .where({
          deleted: 0,
          active: 1
        })
        .select([
          'paymentCredit.id as id',
          'paymentCredit.uuid as uuid',
          'paymentCredit.refound as refound',
          'paymentCredit.used as used',
          'paymentCredit.remaining as remaining',
          'paymentCredit.active as active',
        ])
        .getRawOne();
      let today = new Date();
      let formattedDate = today.toISOString().split('T')[0];
      let paymentUsed = await usedFoundsRepository.createQueryBuilder('payments')
        .where('DATE(payments.created_at) BETWEEN :startDate AND :endDate', { startDate: formattedDate, endDate: formattedDate })
        .select("SUM(payments.payment)", "payment")
        .getRawOne();
      let paymentCredit: any
      if (paymentCreditActive) {
        let refound = Number(paymentCreditActive.refound) + Number(data.refound)
        let remaining = Number(paymentCreditActive.remaining) + Number(data.refound)
        data.refound = refound;
        data.remaining = remaining;
        data.used = Number(paymentUsed.payment)
        //Ingresamos los datos del nuevo registro
        paymentCredit = await paymentCreditRepository.save(data)
        await paymentCreditRepository.update({ uuid: paymentCreditActive.uuid }, { deleted: 1, active: 0 })
      } else {
        data.remaining = Number(data.refound);
        data.used = Number(paymentUsed.payment)
        console.log(data)
        //Ingresamos los datos del nuevo registro
        paymentCredit = await paymentCreditRepository.save(data)
      }
      //Retornamos el resultado del insertado de registro
      return paymentCredit
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readpaymentCredit() {
    try {
      let today = new Date();
      let formattedDate = today.toISOString().split('T')[0];
      //Buscamos y obtenemos todos los paymentCredit
      let creditFounds = await paymentCreditRepository.createQueryBuilder('paymentCredit')
        .where({
          deleted: 0
        })
        .andWhere('DATE(paymentCredit.created_at) BETWEEN :startDate AND :endDate', { startDate: formattedDate, endDate: formattedDate })
        .select([
          'paymentCredit.id as id',
          'paymentCredit.uuid as uuid',
          'paymentCredit.refound as refound',
          'paymentCredit.used as used',
          'paymentCredit.remaining as remaining',
          'paymentCredit.active as active',
        ])
        .getRawOne();
      if (!creditFounds) {
        creditFounds = {};
        creditFounds.refound = 0;
        creditFounds.used = 0;
        creditFounds.remaining = 0;
      }

      let paymentUsed = await usedFoundsRepository.createQueryBuilder('payments')
        .where('DATE(payments.created_at) BETWEEN :startDate AND :endDate', { startDate: formattedDate, endDate: formattedDate })
        .select("SUM(payments.payment)", "payment")
        .getRawOne();

      creditFounds.usedPayed = paymentUsed.payment
      //Retornamos todos los paymentCredit
      return creditFounds;
    } catch (error) {
      console.log(error)
      return error
    }
  }
}