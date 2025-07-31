import { AppDataSource } from '../../config/connection';
import { RelationshipTypes } from '../../entity/CAT/RelationshipTypes';
import { v4 as uuidv4 } from 'uuid';
import { RelationshipTypesHistory } from '../../entity/CAT/RelationshipTypesHistory';

const relationshipTypesRepository = AppDataSource.getRepository(RelationshipTypes);
const relationshipTypesHistoryRepository = AppDataSource.getRepository(RelationshipTypesHistory);

export class RelationshipTypeTransactions {

  static async createRelationshipType(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newRelationshipType = await relationshipTypesRepository.save(data)
      const relationshipType = await this.readRelationshipType(newRelationshipType)
      //Retornamos el resultado del insertado de registro
      return relationshipType
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readRelationshipTypes() {
    try {
      //Buscamos y obtenemos todos los relationshipType
      const relationshipType = await relationshipTypesRepository.createQueryBuilder('relationshipType')
        .where({
          deleted: 0
        })
        .select([
          'relationshipType.id as id',
          'relationshipType.uuid as uuid',
          'relationshipType.name as name',
          'relationshipType.active as active',
        ])
        .getRawMany();
      //Retornamos todos los relationshipType
      return relationshipType;
    } catch (error) {
      return error
    }
  }

  static async readRelationshipType(data: RelationshipTypes) {
    try {
      //Buscamos y obtenemos el relationshipType
      const relationshipType = await relationshipTypesRepository.createQueryBuilder('relationshipType')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'relationshipType.id as id',
          'relationshipType.uuid as uuid',
          'relationshipType.name as name',
          'relationshipType.active as active',
        ])
        .getRawOne();
      //Retornamos el relationshipType encontrado
      return relationshipType;
    } catch (error) {
      return error
    }
  }

  static async updateRelationshipType(data: RelationshipTypes) {
    try {
      await this.readToUpdate(data);
      await relationshipTypesRepository.update({ uuid: data.uuid }, data);
      const relationshipType = await this.readRelationshipType(data)
      return relationshipType;
    } catch (error) {
      return error;
    }
  }

  static async disableRelationshipType(data: RelationshipTypes) {
    try {
      await this.readToUpdate(data);
      await relationshipTypesRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const relationshipType = await this.readRelationshipType(data)
      return relationshipType;
    } catch (error) {
      return error;
    }
  }

  static async enableRelationshipType(data: RelationshipTypes) {
    try {
      await this.readToUpdate(data);
      await relationshipTypesRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const relationshipType = await this.readRelationshipType(data)
      return relationshipType;
    } catch (error) {
      return error;
    }
  }

  static async deleteRelationshipType(data: RelationshipTypes) {
    try {
      await this.readToUpdate(data);
      await relationshipTypesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const relationshipType = await this.readRelationshipType(data)
      return relationshipType;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const rt = await this.readRelationshipType(data)
    let uuid = uuidv4();
    let rtHistory = {
      uuid: uuid,
      id_relation_type: rt.id,
      name: rt.name,
      updated_by: data.updated_by,
    }
    return await relationshipTypesHistoryRepository.save(rtHistory)
  }

}