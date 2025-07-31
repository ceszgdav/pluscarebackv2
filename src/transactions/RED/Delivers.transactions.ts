import { AppDataSource } from '../../config/connection';
import { Delivers } from '../../entity/RED/Delivers';
import { v4 as uuidv4 } from 'uuid';
import { DeliversHistory } from '../../entity/RED/DeliversHistory';
import { BanksAccountsDelivers } from '../../entity/RED/BanksAccountDelivers';
import { BanksAccountsDeliversHistory } from '../../entity/RED/BanksAccountDeliversHistory';
import * as fs from 'fs';
import { DeliversCoverage } from '../../entity/RED/DeliversCoverage';
import { DeliversAvailability } from '../../entity/RED/DeliversAvailability';

const tmpPath = `${process.cwd()}/src/storage/tmp`
const permPath = `${process.cwd()}/src/storage/id`

const deliversRepository = AppDataSource.getRepository(Delivers);
const deliversHistoryRepository = AppDataSource.getRepository(DeliversHistory);

const banksAccountRepository = AppDataSource.getRepository(BanksAccountsDelivers)
const banksAccountHistoryRepository = AppDataSource.getRepository(BanksAccountsDeliversHistory)

const coverageRepository = AppDataSource.getRepository(DeliversCoverage)
const coverageHistoryRepository = AppDataSource.getRepository(BanksAccountsDeliversHistory)

const availabilityRepository = AppDataSource.getRepository(DeliversAvailability)

export class DeliversTransactions {

  static async createDelivers(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newDelivers = await deliversRepository.save(data)
      const delivers = await this.readUpdatedDeliver(newDelivers)

      //Retornamos el resultado del insertado de registro
      return delivers
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async filterDeliver(data: any) {
    try {
      const delivers = await deliversRepository.createQueryBuilder('delivers')
        .where({
          active: 1,
          deleted: 0
        })
        .select([
          'delivers.id as id',
          'delivers.uuid as uuid',
          'delivers.name as name',
          'delivers.phone as phone',
          'delivers.state as state',
          'delivers.active as active',
        ])
        .leftJoin(DeliversCoverage, 'coverage', 'coverage.deliver_id = delivers.id') // Hacemos el join entre ambas tablas
        .where('delivers.state LIKE :state', { state: '%' + data.state + '%' }) // Filtro para el estado en la tabla Medics
        .andWhere('coverage.coverage_place LIKE :coverage_place', { coverage_place: '%' + data.municipality + '%' }) // Filtro para el municipio en la tabla Coverage
        .getRawMany();
      return delivers;
    } catch (error) {
      return error;
    }
  }

  static async createCoverage(data: any, deliver_id, created_by) {
    try {
      console.log(data)
      await coverageRepository
        .createQueryBuilder('coverage')
        .delete()
        .where({
          deliver_id: deliver_id
        })
        .execute();
      data.forEach(async element => {
        let uuid = uuidv4();
        let coverage_place = element
        let data = { coverage_place, deliver_id, uuid, created_by }
        console.log(data)
        //Ingresamos los datos del nuevo registro
        await coverageRepository.save(data)
      });
      //Retornamos el resultado del insertado de registro
      return 'ok'
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createAvailability(data: any, deliver_id, created_by) {
    try {
      console.log(data)
      await availabilityRepository
        .createQueryBuilder('availability')
        .delete()
        .where({
          deliver_id: deliver_id
        })
        .execute();
      data.forEach(async element => {
        let uuid = uuidv4();
        let availability = element
        let data = { ...availability, deliver_id, uuid, created_by }
        console.log(data)
        //Ingresamos los datos del nuevo registro
        await availabilityRepository.save(data)
      });
      //Retornamos el resultado del insertado de registro
      return 'ok'
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createBankAccount(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newBanksAccounts = await banksAccountRepository.save(data)
      //Retornamos el resultado del insertado de registro
      return newBanksAccounts
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createAvalability(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newavailability = await availabilityRepository.save(data)
      //Retornamos el resultado del insertado de registro
      return newavailability
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readDelivers() {
    try {
      //Buscamos y obtenemos todos los repartidores
      const delivers = await deliversRepository.createQueryBuilder('delivers')
        .where({
          deleted: 0
        })
        .orderBy('delivers.id', 'DESC')
        .select([
          'delivers.id as id',
          'delivers.uuid as uuid',
          'delivers.name as name',
          'delivers.phone as phone',
          'delivers.state as state',
          'delivers.active as active',
        ])
        .getRawMany();
      //Retornamos todos los delivers
      return delivers;
    } catch (error) {
      return error
    }
  }

  static async readDeliver(data: any) {
    try {
      console.log(data)
      //Buscamos y obtenemos el delivers
      const delivers = await deliversRepository.createQueryBuilder('delivers')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'delivers.id as id',
          'delivers.uuid as uuid',
          'delivers.name as name',
          'delivers.phone as phone',
          'delivers.state as state',
          'delivers.price as "price"',
          'delivers.active as active',
        ])
        .getRawOne();

      const banksAccounts = await banksAccountRepository.createQueryBuilder('bad')
        .where({
          deleted: 0,
          deliver_id: delivers.id
        })
        .select([
          'bad.uuid as "uuid"',
          'bad.card_number as "card_number"',
          'bad.clabe_number as "clabe_number"',
          'bad.bank as "bank"',
        ])
        .getRawMany();

      const deliverCoverage = await coverageRepository.createQueryBuilder('coverage')
        .where({
          deleted: 0,
          deliver_id: delivers.id
        })
        .select(['coverage.coverage_place'])
        .getRawMany();

      const coverageArray = deliverCoverage.map(c => c.coverage_coverage_place);

      const deliverAvailability = await availabilityRepository.createQueryBuilder('availability')
        .where({
          deleted: 0,
          deliver_id: delivers.id
        })
        .select(['availability.day as day', 'availability.hourFrom as "hourFrom"', 'availability.hourTo as "hourTo"'])
        .getRawMany();


      delivers.bank_account = banksAccounts
      delivers.coverage = coverageArray
      delivers.availability = deliverAvailability
      //Retornamos el delivers encontrado
      return delivers;
    } catch (error) {
      return error
    }
  }
  static async readDeliversToPay(data: any) {
    try {
      console.log(data)
      //Buscamos y obtenemos el delivers
      const delivers = await deliversRepository.createQueryBuilder('delivers')
        .where({
          deleted: 0,
          id: data.id
        })
        .select([
          'delivers.id as id',
          'delivers.uuid as uuid',
          'delivers.name as name',
          'delivers.phone as phone',
          'delivers.state as state',
          'delivers.price as "price"',
          'delivers.active as active',
        ])
        .getRawOne();

      const banksAccounts = await banksAccountRepository.createQueryBuilder('bad')
        .where({
          deleted: 0,
          deliver_id: delivers.id
        })
        .select([
          'bad.uuid as "uuid"',
          'bad.card_number as "card_number"',
          'bad.clabe_number as "clabe_number"',
          'bad.bank as "bank"',
        ])
        .getRawMany();

      delivers.bank_account = banksAccounts
      //Retornamos el delivers encontrado
      return delivers;
    } catch (error) {
      return error
    }
  }
  static async readUpdatedDeliver(data: any) {
    try {
      console.log(data)
      //Buscamos y obtenemos el delivers
      const delivers = await deliversRepository.createQueryBuilder('delivers')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'delivers.id as id',
          'delivers.uuid as uuid',
          'delivers.name as name',
          'delivers.phone as phone',
          'delivers.state as state',
          'delivers.price as "price"',
          'delivers.active as active',
        ])
        .getRawOne();
      //Retornamos el delivers encontrado
      return delivers;
    } catch (error) {
      return error
    }
  }

  static async updateDeliver(data: any) {
    try {
      await deliversRepository.update({ uuid: data.uuid }, data);
      console.log('actualizado')
      let deliver = await this.readUpdatedDeliver(data)
      return deliver;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  static async updateDeliverBankAccount(data: any) {
    try {
      console.log(data)
      data.forEach(async (element) => {
        await banksAccountRepository.update({ uuid: element.uuid }, element);
      });
      return 'ok';
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  static async disableDeliver(data: Delivers) {
    try {
      await deliversRepository.update({ uuid: data.uuid }, { active: 0 });
      const delivers = await this.readUpdatedDeliver(data)
      return delivers;
    } catch (error) {
      return error;
    }
  }

  static async enableDeliver(data: Delivers) {
    try {
      await deliversRepository.update({ uuid: data.uuid }, { active: 1 });
      const delivers = await this.readUpdatedDeliver(data)
      return delivers;
    } catch (error) {
      return error;
    }
  }

  static async deleteDeliver(data: Delivers) {
    try {
      await deliversRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0 });
      const delivers = await this.readUpdatedDeliver(data)
      return delivers;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const gender = await this.readUpdatedDeliver(data)
    let uuid = uuidv4();
    let genderHistory = {
      uuid: uuid,
      id_deliver: gender.id,
      name: gender.name,
      phone: gender.phone,
      location: gender.location,
      card_number: gender.card_number,
      clabe_number: gender.clabe_number,
      bank: gender.bank,
      updated_by: data.updated_by,
    }
    return await deliversHistoryRepository.save(genderHistory)
  }

}

function unlinkPath(path: string) {
  fs.unlinkSync(path)
}

function linkPath(oldPath: string, newPath: string) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
  })
}
