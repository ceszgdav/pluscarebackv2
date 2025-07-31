import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { DeliverMedicationsList } from '../../entity/SERV/DeliveryMedicationsList';
import { DeliverMedications } from '../../entity/SERV/DeliveryMedications';
import { Delivers } from '../../entity/RED/Delivers';
import { DeliverMedicationsPayment } from '../../entity/SERV/DeliveryMedicationsPayment';

const DeliveryMedicationsRepository = AppDataSource.getRepository(DeliverMedications);
const DeliveryMedicationsListRepository = AppDataSource.getRepository(DeliverMedicationsList);
const DeliveryMedicationsPaymentRepository = AppDataSource.getRepository(DeliverMedicationsPayment);

export class DeliveryMedicationsTransactions {

  static async createDeliveryMedications(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      data.remaining = data.pluscare_price_total
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      delete newData.medications;
      if (newData.subtotal) {
        delete newData.subtotal;
        delete newData.subtotalExcedent;
      }
      delete newData.totalMeds;
      //Ingresamos los datos del nuevo servicioProgramado
      const envioMedicamentos = await DeliveryMedicationsRepository.save(newData)
      this.readDeliveryMedicationsCreated(envioMedicamentos)
      //Retornamos el resultado del insertado de servicioProgramado
      return envioMedicamentos
    } catch (error) {
      //Obtener y enviar el error
      return error
    }
  }

  static async createDeliveryMedicationsList(data: any, deliverMedication_id) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      let list = data.medications
      list.forEach(async (element) => {
        let newData = { ...element, uuid, deliverMedication_id }
        //Ingresamos los datos del nuevo servicioProgramado
        await DeliveryMedicationsListRepository.save(newData)
      });
      //Retornamos el resultado del insertado de servicioProgramado
      return 'ok'
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readDeliveryMedicationsCreated(data) {
    try {
      const servicioProgramado = await DeliveryMedicationsRepository.createQueryBuilder('deliveryMedications')
        .where({
          deleted: 0,
          active: 1,
          uuid: data.uuid
        })
        .select([
          'deliveryMedications.id as "id"',
          'deliveryMedications.uuid as "uuid"',
          'deliveryMedications.state as "state"',
          'deliveryMedications.municipality as "municipality"',
          'deliveryMedications.expedient as "expedient"',
          'deliveryMedications.name as "name"',
          'deliveryMedications.request_date as "request_date"',
          'deliveryMedications.delivery_cost as "delivery_cost"',
          'deliveryMedications.deliver_id as "deliver_id"',
          'deliveryMedications.ensurer as "ensurer"',
        ])
        .getRawOne();
      //Retornamos el servicioProgramado
      return servicioProgramado;
    } catch (error) {
      return error;
    }
  }

  static async readDeliveryMedicationsAll() {
    try {
      const servicioProgramadoIke = await DeliveryMedicationsRepository.createQueryBuilder('deliveryMedications')
        .where({
          deleted: 0,
          active: 1,
          ensurer: 'I'
        })
        .select([
          'deliveryMedications.id as "id"',
          'deliveryMedications.uuid as "uuid"',
          'deliveryMedications.state as "state"',
          'deliveryMedications.municipality as "municipality"',
          'deliveryMedications.pluscare_price as "pluscare_price"',
          'deliveryMedications.pluscare_price_delivery as "pluscare_price_delivery"',
          'deliveryMedications.pluscare_price_total as "pluscare_price_total"',
          'deliveryMedications.expedient as "expedient"',
          'deliveryMedications.name as "name"',
          'deliveryMedications.request_date as "request_date"',
          'deliveryMedications.delivery_cost as "delivery_cost"',
          'deliveryMedications.exceded_cost_payed as "exceded_cost_payed"',
          'deliveryMedications.total_cost as "total_cost"',
          'deliveryMedications.remarks as "remarks"',
          'deliveryMedications.remaining as "remaining"',
          'deliveryMedications.deliver_id as "deliver_id"',
          'deliver.name as "deliver_name"',
          'medicationList.id as "productId"',
          'medicationList.product as "productList"',
          'medicationList.units as "unitsList"',
          'medicationList.cost as "costList"',
        ])
        .leftJoin(Delivers, 'deliver', 'deliveryMedications.deliver_id = deliver.id')
        .leftJoin(DeliverMedicationsList, 'medicationList', 'medicationList.deleted = :deletedList AND medicationList.deliverMedication_id = deliveryMedications.id', { deletedList: 0 })
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const medicsListsMap = new Map<number, any>();

      servicioProgramadoIke.forEach((deliveryMedic: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!medicsListsMap.has(deliveryMedic.id)) {
          medicsListsMap.set(deliveryMedic.id, {
            id: deliveryMedic.id,
            uuid: deliveryMedic.uuid,
            pluscare_price: deliveryMedic.pluscare_price,
            pluscare_price_delivery: deliveryMedic.pluscare_price_delivery,
            pluscare_price_total: deliveryMedic.pluscare_price_total,
            state: deliveryMedic.state,
            municipality: deliveryMedic.municipality,
            expedient: deliveryMedic.expedient,
            name: deliveryMedic.name,
            request_date: deliveryMedic.request_date,
            delivery_cost: deliveryMedic.delivery_cost,
            exceded_cost_payed: deliveryMedic.exceded_cost_payed,
            total_cost: deliveryMedic.total_cost,
            remarks: deliveryMedic.remarks,
            deliver_name: deliveryMedic.deliver_name,
            remaining: deliveryMedic.remaining,
            deliver_id: deliveryMedic.deliver_id,
            medications: [],
            expandMedications: false,
          });
        }
        // Agregar contacto si no existe en la lista de contactos
        const existingMeds = medicsListsMap.get(deliveryMedic.id).medications;
        const medicExist = existingMeds.some((med: any) => med.id === med.productId);
        if (deliveryMedic.productId && !medicExist) {
          medicsListsMap.get(deliveryMedic.id).medications.push({
            productId: deliveryMedic.productId,
            productList: deliveryMedic.productList,
            unitsList: deliveryMedic.unitsList,
            costList: deliveryMedic.costList,
          });
        }
      })

      // Convertir el mapa de suppliers en un arreglo
      let ikeTransform = Array.from(medicsListsMap.values());

      const servicioProgramadoVivaWell = await DeliveryMedicationsRepository.createQueryBuilder('deliveryMedications')
        .where({
          deleted: 0,
          active: 1,
          ensurer: 'V'
        })
        .select([
          'deliveryMedications.id as "id"',
          'deliveryMedications.uuid as "uuid"',
          'deliveryMedications.state as "state"',
          'deliveryMedications.municipality as "municipality"',
          'deliveryMedications.request_date as "request_date"',
          'deliveryMedications.expedient as "expedient"',
          'deliveryMedications.plan_number as "plan_number"',
          'deliveryMedications.name as "name"',
          'deliveryMedications.payment_type as "payment_type"',
          'deliveryMedications.pluscare_price as "pluscare_price"',
          'deliveryMedications.pluscare_price_delivery as "pluscare_price_delivery"',
          'deliveryMedications.pluscare_price_total as "pluscare_price_total"',
          'deliveryMedications.ensurer_price as "ensurer_price"',
          'deliveryMedications.ensurer_price_delivery as "ensurer_price_delivery"',
          'deliveryMedications.subtotal_cost as "subtotal_cost"',
          'deliveryMedications.total_cost as "total_cost"',
          'deliveryMedications.advisor as "advisor"',
          'deliveryMedications.drugstore as "drugstore"',
          'deliveryMedications.surplus as "surplus"',
          'deliveryMedications.remaining as "remaining"',
          'deliveryMedications.deliver_id as "deliver_id"',
          'deliver.name as "deliver_name"',
          'medicationList.id as "productId"',
          'medicationList.product as "productList"',
          'medicationList.units as "unitsList"',
          'medicationList.cost as "costList"',
          'medicationList.presentation as "presentationList"',
          'medicationList.type as "typeList"',
        ])
        .leftJoin(Delivers, 'deliver', 'deliveryMedications.deliver_id = deliver.id')
        .leftJoin(DeliverMedicationsList, 'medicationList', 'medicationList.deleted = :deletedList AND medicationList.deliverMedication_id = deliveryMedications.id', { deletedList: 0 })
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const medicsListsMapVivaWell = new Map<number, any>();

      servicioProgramadoVivaWell.forEach((deliveryMedic: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!medicsListsMapVivaWell.has(deliveryMedic.id)) {
          medicsListsMapVivaWell.set(deliveryMedic.id, {
            id: deliveryMedic.id,
            uuid: deliveryMedic.uuid,
            request_date: deliveryMedic.request_date,
            state: deliveryMedic.state,
            municipality: deliveryMedic.municipality,
            expedient: deliveryMedic.expedient,
            plan_number: deliveryMedic.plan_number,
            name: deliveryMedic.name,
            payment_type: deliveryMedic.payment_type,
            pluscare_price: deliveryMedic.pluscare_price,
            pluscare_price_delivery: deliveryMedic.pluscare_price_delivery,
            pluscare_price_total: deliveryMedic.pluscare_price_total,
            ensurer_price: deliveryMedic.ensurer_price,
            ensurer_price_delivery: deliveryMedic.ensurer_price_delivery,
            subtotal_cost: deliveryMedic.subtotal_cost,
            total_cost: deliveryMedic.total_cost,
            advisor: deliveryMedic.advisor,
            drugstore: deliveryMedic.drugstore,
            surplus: deliveryMedic.surplus,
            deliver_name: deliveryMedic.deliver_name,
            remaining: deliveryMedic.remaining,
            deliver_id: deliveryMedic.deliver_id,
            medications: [],
            expandMedications: false,
          });
        }
        // Agregar contacto si no existe en la lista de contactos
        const existingMeds = medicsListsMapVivaWell.get(deliveryMedic.id).medications;
        const medicExist = existingMeds.some((med: any) => med.id === med.productId);
        if (deliveryMedic.productId && !medicExist) {
          medicsListsMapVivaWell.get(deliveryMedic.id).medications.push({
            productId: deliveryMedic.productId,
            productList: deliveryMedic.productList,
            unitsList: deliveryMedic.unitsList,
            costList: deliveryMedic.costList,
            presentationList: deliveryMedic.presentationList,
            typeList: deliveryMedic.typeList,
          });
        }
      })

      // Convertir el mapa de suppliers en un arreglo
      let vivaWellTransform = Array.from(medicsListsMapVivaWell.values());

      let resp = { "vivawell": vivaWellTransform, "ike": ikeTransform }
      //Retornamos el servicioProgramado
      return resp;
    } catch (error) {
      return error;
    }
  }

  static async setDeliveryMedicationsPayment(data) {
    try {
      const servicioPagar = await DeliveryMedicationsRepository.createQueryBuilder('deliveryMedications')
        .where({
          deleted: 0,
          active: 1,
          id: data.deliverMedication_id
        })
        .select([
          'deliveryMedications.id as "id"',
          'deliveryMedications.total_cost as "total_cost"',
          'deliveryMedications.remaining as "remaining"',
        ])
        .getRawOne();
      console.log(servicioPagar)
      console.log(data.payment)
      let restantePagar = Number(servicioPagar.remaining) - Number(data.payment)
      console.log(restantePagar)
      await DeliveryMedicationsRepository.update({ id: data.deliverMedication_id }, { remaining: restantePagar });
      delete data.deliver_id;
      delete data.voucherFront;
      console.log(data)
      //Creamos el uuid para el Role
      let uuid = uuidv4();

      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      await DeliveryMedicationsPaymentRepository.save(newData);
      return { remaining: restantePagar }
    } catch (error) {
      console.log(error)
      return error
    }
  }

}