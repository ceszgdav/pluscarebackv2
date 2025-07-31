import { AppDataSource } from '../../config/connection';
import { Paramedics } from '../../entity/ADM/Paramedics';
import { v4 as uuidv4 } from 'uuid';
import { ParamedicsHistory } from '../../entity/ADM/ParamedicsHistory';
import { ModulesParamedicsAccess } from '../../entity/ADM/ModulesParamedicsAccess';
import { Roles } from '../../entity/ADM/Roles';
import { encrypt } from '../../utils/handlePassword';

const paramedicsRepository = AppDataSource.getRepository(Paramedics);
const paramedicsHistoryRepository = AppDataSource.getRepository(ParamedicsHistory);
const modulesParamedicRepository = AppDataSource.getRepository(ModulesParamedicsAccess);

export class ParamedicTransactions {

  static async createParamedic(data: any) {
    try {
      //Encriptamos la contraseña que se envia
      const password = await encrypt(data.password);
      //Creamos el nuevo json
      const newData = { ...data, password }
      //Ingresamos los datos del nuevo registro
      const nuewParamedic = await paramedicsRepository.save(newData)
      const usuarios = await this.readParamedic(nuewParamedic)
      //Retornamos el resultado del insertado de registro
      return usuarios
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async assignModules(data: any, idUser: any) {
    try {
      let id_paramedic = idUser;


      const moduloAcceso = await modulesParamedicRepository.createQueryBuilder('acceso')
        .where({
          id_paramedic: id_paramedic
        })
        .getRawOne();

      if (moduloAcceso) {
        await modulesParamedicRepository.createQueryBuilder('modulo')
          .delete()
          .where({
            id_paramedic: id_paramedic
          })
          .execute();
        await Object.values(data).forEach(async (element: any, index: any) => {
          if (element) {
            let ma = {
              id_paramedic: id_paramedic,
              id_module: index + 1
            }
            await modulesParamedicRepository.save(ma)
          }
        });

        return 'ok';
      } else {
        Object.values(data).forEach(async (element: any, index: any) => {
          if (element) {
            let ma = {
              id_paramedic: id_paramedic,
              id_module: index + 1
            }
            await modulesParamedicRepository.save(ma)
          }
        });
        return 'ok';
      }
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readParamedics() {
    try {
      //Buscamos y obtenemos todos los usuarios
      const usuarios = await paramedicsRepository.createQueryBuilder('paramedic')
        .where({
          deleted: 0
        })
        .select([
          'paramedic.id as id',
          'paramedic.uuid as uuid',
          'paramedic.name as name',
          'paramedic.username as username',
          'paramedic.active as active',
          'paramedic.token as token',
          'paramedic.user_type as user_type',
        ])
        .getRawMany();
      //Retornamos todos los usuarios
      return usuarios;
    } catch (error) {
      return error
    }
  }

  static async readParamedic(data: Paramedics) {
    try {
      //Buscamos y obtenemos el paramedic
      const paramedic = await paramedicsRepository.createQueryBuilder('paramedic')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'paramedic.id as id',
          'paramedic.uuid as uuid',
          'paramedic.name as name',
          'paramedic.username as username',
          'paramedic.active as active',
          'paramedic.token as token',
          'paramedic.user_type as user_type',
        ])
        .getRawOne();
      //Retornamos el paramedic encontrado
      return paramedic;
    } catch (error) {
      return error
    }
  }

  static async updateParamedic(data: any) {
    try {
      await this.readToUpdate(data);
      if (data.password !== "") {
        //Encriptamos la contraseña que se envia
        const password = await encrypt(data.password);
        //Creamos el nuevo json
        data = { ...data, password }
      }
      await paramedicsRepository.update({ uuid: data.uuid }, data);
      const paramedic = await this.readParamedic(data)
      return paramedic;
    } catch (error) {
      return error;
    }
  }

  static async disableParamedic(data: Paramedics) {
    try {
      await this.readToUpdate(data);
      await paramedicsRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const paramedic = await this.readParamedic(data)
      return paramedic;
    } catch (error) {
      return error;
    }
  }

  static async enableParamedic(data: Paramedics) {
    try {
      await this.readToUpdate(data);
      await paramedicsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const paramedic = await this.readParamedic(data)
      return paramedic;
    } catch (error) {
      return error;
    }
  }

  static async deleteParamedic(data: Paramedics) {
    try {
      await this.readToUpdate(data);
      await paramedicsRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const operator = await this.readParamedic(data)
    let uuid = uuidv4();
    let operatorHistory = {
      uuid: uuid,
      name: operator.name,
      username: operator.username,
      password: operator.password,
      id_role: operator.id_role,
      updated_by: data.updated_by,
    }
    return await paramedicsHistoryRepository.save(operatorHistory)
  }

}