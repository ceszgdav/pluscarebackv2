import { AppDataSource } from '../../config/connection';
import { ServiceType } from '../../entity/CAT/ServiceTypes';
import { v4 as uuidv4 } from 'uuid';
import { ServiceTypeHistory } from '../../entity/CAT/ServiceTypesHistory';

const serviceTypeRepository = AppDataSource.getRepository(ServiceType);
const serviceTypeHistoryRepository = AppDataSource.getRepository(ServiceTypeHistory);

export class ServiceTypesTransactions {

  static async createServiceType(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newServiceType = await serviceTypeRepository.save(data)
      const serviceTypes = await this.readServiceType(newServiceType)
      //Retornamos el resultado del insertado de registro
      return serviceTypes
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readServiceTypes() {
    try {
      //Buscamos y obtenemos todos los serviceTypes
      const serviceTypes = await serviceTypeRepository.createQueryBuilder('serviceType')
        .where({
          deleted: 0
        })
        .select([
          'serviceType.id as id',
          'serviceType.uuid as uuid',
          'serviceType.name as name',
          'serviceType.description as description',
          'serviceType.active as active',
        ])
        .getRawMany();
      //Retornamos todos los serviceTypes
      return serviceTypes;
    } catch (error) {
      return error
    }
  }

  static async readServiceType(data: ServiceType) {
    try {
      //Buscamos y obtenemos el serviceType
      const serviceType = await serviceTypeRepository.createQueryBuilder('serviceType')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'serviceType.id as id',
          'serviceType.uuid as uuid',
          'serviceType.name as name',
          'serviceType.description as description',
          'serviceType.active as active',
        ])
        .getRawOne();
      //Retornamos el serviceType encontrado
      return serviceType;
    } catch (error) {
      return error
    }
  }

  static async updateServiceTypes(data: ServiceType) {
    try {
      await this.readToUpdate(data);
      await serviceTypeRepository.update({ uuid: data.uuid }, data);
      const serviceType = await this.readServiceType(data)
      return serviceType;
    } catch (error) {
      return error;
    }
  }

  static async disableServiceTypes(data: ServiceType) {
    try {
      await this.readToUpdate(data);
      await serviceTypeRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const serviceType = await this.readServiceType(data)
      return serviceType;
    } catch (error) {
      return error;
    }
  }

  static async enableServiceTypes(data: ServiceType) {
    try {
      await this.readToUpdate(data);
      await serviceTypeRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const serviceType = await this.readServiceType(data)
      return serviceType;
    } catch (error) {
      return error;
    }
  }

  static async deleteServiceTypes(data: ServiceType) {
    try {
      await this.readToUpdate(data);
      await serviceTypeRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const serviceType = await this.readServiceType(data)
      return serviceType;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const st = await this.readServiceType(data)
    let uuid = uuidv4();
    let stHistory = {
      uuid: uuid,
      id_service_type: st.id,
      name: st.name,
      description: st.description,
      updated_by: data.updated_by,
    }
    return await serviceTypeHistoryRepository.save(stHistory)
  }

}