import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { Medics } from '../../entity/RED/Medics';
import { MedicsHistory } from '../../entity/RED/MedicsHistory';
import { MedicsCoverage } from '../../entity/RED/MedicsCoverage';
import { Like } from 'typeorm';

const medicRepository = AppDataSource.getRepository(Medics);
const medicHistoryRepository = AppDataSource.getRepository(MedicsHistory);
const coverageRepository = AppDataSource.getRepository(MedicsCoverage);

export class MedicsTransactions {

  static async createMedics(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newMedics = await medicRepository.save(data)
      const medic = await this.readMedicInserted(newMedics)
      let medic_id = medic.id
      let created_by = data.created_by
      await this.createCoverage(data.coverage, medic_id, created_by)
      //Retornamos el resultado del insertado de registro
      return medic
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createCoverage(data: any, medic_id, created_by) {
    try {
      for (const element of data) {
        let uuid = uuidv4();
        let coverage_place = element
        let data = { coverage_place, medic_id, uuid, created_by }
        //Ingresamos los datos del nuevo registro
        await coverageRepository.save(data)
      }
      setTimeout(async () => {
        const medic = await this.readMedic(data)
        //Retornamos el resultado del insertado de registro
        return medic
      }, 3000);
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readMedics() {
    try {
      //Buscamos y obtenemos todos los repartidores
      const medic = await medicRepository.createQueryBuilder('medic')
        .where({
          deleted: 0
        })
        .orderBy('medic.id', 'DESC')
        .select([
          'medic.id as id',
          'medic.uuid as uuid',
          'medic.name as "name"',
          'medic.phone as "phone"',
          'medic.state as "state"',
          'medic.price as "price"',
          'medic.available_schedule as "available_schedule"',
          'medic.active as active',
          'coverage.id as coverage_id',
          'coverage.coverage_place as coverage_place'
        ])
        .leftJoin(MedicsCoverage, 'coverage', 'coverage.medic_id = medic.id')
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const medicsMap = new Map<number, any>();

      medic.forEach((actualMedic: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!medicsMap.has(actualMedic.id)) {
          medicsMap.set(actualMedic.id, {
            id: actualMedic.id,
            uuid: actualMedic.uuid,
            name: actualMedic.name,
            phone: actualMedic.phone,
            state: actualMedic.state,
            price: actualMedic.price,
            active: actualMedic.active,
            available_schedule: actualMedic.available_schedule,
            cobertura: []
          });
        }

        // Agregar contacto si no existe en la lista de contactos
        const existingUnit = medicsMap.get(actualMedic.id).cobertura;
        const unitExists = existingUnit.some((unit: any) => unit.id === actualMedic.coverage_id);

        if (actualMedic.coverage_id && !unitExists) {
          medicsMap.get(actualMedic.id).cobertura.push({
            id: actualMedic.coverage_id,
            coverage_place: actualMedic.coverage_place
          });
        }
      })

      // Convertir el mapa de suppliers en un arreglo
      let medicsTransform = Array.from(medicsMap.values());
      //Retornamos todos los medic
      return medicsTransform;
    } catch (error) {
      return error
    }
  }

  static async readMedicInserted(data: Medics) {
    try {
      //Buscamos y obtenemos el medic
      const medic = await medicRepository.createQueryBuilder('medic')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'medic.id as id',
          'medic.uuid as uuid',
          'medic.name as "name"',
          'medic.phone as "phone"',
          'medic.state as "state"',
          'medic.available_schedule as "available_schedule"'
        ])
        .getRawOne();
      //Retornamos todos los medic
      return medic;
    } catch (error) {
      return error
    }
  }

  static async readMedic(data: Medics) {
    try {
      //Buscamos y obtenemos el medic
      const medic = await medicRepository.createQueryBuilder('medic')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'medic.id as id',
          'medic.uuid as uuid',
          'medic.name as "name"',
          'medic.phone as "phone"',
          'medic.state as "state"',
          'medic.available_schedule as "available_schedule"',
          'medic.active as active',
          'coverage.id as coverage_id',
          'coverage.coverage_place as coverage_place'
        ])
        .leftJoin(MedicsCoverage, 'coverage', 'coverage.medic_id = medic.id')
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const medicsMap = new Map<number, any>();

      medic.forEach((actualMedic: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!medicsMap.has(actualMedic.id)) {
          medicsMap.set(actualMedic.id, {
            id: actualMedic.id,
            uuid: actualMedic.uuid,
            name: actualMedic.name,
            phone: actualMedic.phone,
            state: actualMedic.state,
            available_schedule: actualMedic.available_schedule,
            cobertura: []
          });
        }

        // Agregar contacto si no existe en la lista de contactos
        const existingUnit = medicsMap.get(actualMedic.id).cobertura;
        const unitExists = existingUnit.some((unit: any) => unit.id === actualMedic.coverage_id);

        if (actualMedic.coverage_id && !unitExists) {
          medicsMap.get(actualMedic.id).cobertura.push({
            id: actualMedic.coverage_id,
            coverage_place: actualMedic.coverage_place
          });
        }
      })

      // Convertir el mapa de suppliers en un arreglo
      let medicsTransform = Array.from(medicsMap.values());
      //Retornamos todos los medic
      return medicsTransform[0];
    } catch (error) {
      return error
    }
  }

  static async readSingleMedic(data: Medics) {
    try {
      //Buscamos y obtenemos el medic
      const medic = await medicRepository.createQueryBuilder('medic')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'medic.id as id',
          'medic.uuid as uuid',
          'medic.name as "name"',
          'medic.phone as "phone"',
          'medic.state as "state"',
          'medic.professional_id as "professional_id"',
          'medic.price as "price"',
          'medic.bank_account_number as "bank_account_number"',
          'medic.card_number as "card_number"',
          'medic.entity_bank as "entity_bank"',
          'medic.available_schedule as "available_schedule"',
          'medic.active as active',
        ])
        .getRawOne();
      //Retornamos el medic encontrado
      return medic;
    } catch (error) {
      return error
    }
  }

  static async updateMedic(data: any) {
    try {
      await medicRepository.update({ uuid: data.uuid }, data);
      const medic = await this.readMedic(data)
      return medic;
    } catch (error) {
      return error;
    }
  }

  static async disableMedic(data: Medics) {
    try {
      await medicRepository.update({ uuid: data.uuid }, { active: 0 });
      const medic = await this.readMedic(data)
      return medic;
    } catch (error) {
      return error;
    }
  }

  static async enableMedic(data: Medics) {
    try {
      await medicRepository.update({ uuid: data.uuid }, { active: 1 });
      const medic = await this.readMedic(data)
      return medic;
    } catch (error) {
      return error;
    }
  }

  static async deleteMedic(data: Medics) {
    try {
      await medicRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0 });
      const medic = await this.readMedic(data)
      return medic;
    } catch (error) {
      return error;
    }
  }

  static async filterMedic(data: any) {
    try {
      const medic = await medicRepository.createQueryBuilder('medic')
        .where({
          active: 1,
          deleted: 0
        })
        .select([
          'medic.id as id',
          'medic.uuid as uuid',
          'medic.name as "name"',
          'medic.phone as "phone"',
          'medic.state as "state"',
          'medic.professional_id as "professional_id"',
          'medic.price as "price"',
          'medic.bank_account_number as "bank_account_number"',
          'medic.card_number as "card_number"',
          'medic.entity_bank as "entity_bank"',
          'medic.available_schedule as "available_schedule"',
          'medic.active as active',
        ])
        .leftJoin(MedicsCoverage, 'coverage', 'coverage.medic_id = medic.id') // Hacemos el join entre ambas tablas
        .where('medic.state LIKE :state', { state: '%' + data.state + '%' }) // Filtro para el estado en la tabla Medics
        .andWhere('coverage.coverage_place LIKE :coverage_place', { coverage_place: '%' + data.municipality + '%' }) // Filtro para el municipio en la tabla Coverage
        .getRawMany();
      return medic;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const gender = await this.readMedic(data)
    let uuid = uuidv4();
    let genderHistory = {
      uuid: uuid,
      id_Medic: gender.id,
      name: gender.name,
      phone: gender.phone,
      location: gender.location,
      card_number: gender.card_number,
      clabe_number: gender.clabe_number,
      bank: gender.bank,
      updated_by: data.updated_by,
    }
    return await medicHistoryRepository.save(genderHistory)
  }

}