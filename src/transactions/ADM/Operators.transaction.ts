import { AppDataSource } from '../../config/connection';
import { Operators } from '../../entity/ADM/Operators';
import { OperatorsHistory } from '../../entity/ADM/OperatorsHistory';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../../utils/handlePassword';
import { ModulesOperatorsAccess } from '../../entity/ADM/ModulesOperatorsAccess';
import { Roles } from '../../entity/ADM/Roles';

const operatorsRepository = AppDataSource.getRepository(Operators);
const operatorsHistoryRepository = AppDataSource.getRepository(OperatorsHistory);
const modulesOperatorsRepository = AppDataSource.getRepository(ModulesOperatorsAccess);

export class OperatorTransactions {

  static async createOperator(data: any) {
    try {
      //Encriptamos la contraseña que se envia
      const password = await encrypt(data.password);
      //Creamos el nuevo json
      const newData = { ...data, password }
      //Ingresamos los datos del nuevo registro
      const nuewOperator = await operatorsRepository.save(newData)
      const operators = await this.readOperator(nuewOperator)
      //Retornamos el resultado del insertado de registro
      return operators
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async assignModules(data: any, idUser: any) {
    try {
      let id_operator = idUser;


      const moduloAcceso = await modulesOperatorsRepository.createQueryBuilder('acceso')
        .where({
          id_operator: id_operator
        })
        .getRawOne();

      if (moduloAcceso) {
        await modulesOperatorsRepository.createQueryBuilder('modulo')
          .delete()
          .where({
            id_operator: id_operator
          })
          .execute();
        await Object.values(data).forEach(async (element: any, index: any) => {
          if (element) {
            let ma = {
              id_operator: id_operator,
              id_module: index + 1
            }
            await modulesOperatorsRepository.save(ma)
          }
        });

        return 'ok';
      } else {
        Object.values(data).forEach(async (element: any, index: any) => {
          if (element) {
            let ma = {
              id_operator: id_operator,
              id_module: index + 1
            }
            await modulesOperatorsRepository.save(ma)
          }
        });
        return 'ok';
      }
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readOperators() {
    try {
      //Buscamos y obtenemos todos los operators
      const operators = await operatorsRepository.createQueryBuilder('operador')
        .where({
          deleted: 0
        })
        .select([
          'operador.id as id',
          'operador.uuid as uuid',
          'operador.name as name',
          'operador.phone as phone',
          'operador.email as email',
          'operador.username as username',
          'operador.licence_number as licence_number',
          'operador.due_date_licence as due_date_licence',
          'operador.active as active',
        ])
        .getRawMany();
      //Retornamos todos los operators
      return operators;
    } catch (error) {
      return error
    }
  }

  static async readOperator(data: Operators) {
    try {
      //Buscamos y obtenemos el operador
      const operador = await operatorsRepository.createQueryBuilder('operador')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'operador.id as id',
          'operador.uuid as uuid',
          'operador.name as name',
          'operador.phone as phone',
          'operador.email as email',
          'operador.username as username',
          'operador.licence_number as licence_number',
          'operador.due_date_licence as due_date_licence',
          'operador.active as active',
        ])
        .getRawOne();
      //Retornamos el operador encontrado
      return operador;
    } catch (error) {
      return error
    }
  }

  static async updateOperator(data: any) {
    try {
      await this.readToUpdate(data);
      if (data.password !== "") {
        //Encriptamos la contraseña que se envia
        const password = await encrypt(data.password);
        //Creamos el nuevo json
        data = { ...data, password }
      }
      await operatorsRepository.update({ uuid: data.uuid }, data);
      this.readToUpdate(data);
      const operador = await this.readOperator(data)
      return operador;
    } catch (error) {
      return error;
    }
  }

  static async disableOperator(data: Operators) {
    try {
      await this.readToUpdate(data);
      await operatorsRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const operador = await this.readOperator(data)
      return operador;
    } catch (error) {
      return error;
    }
  }

  static async enableOperator(data: Operators) {
    try {
      await this.readToUpdate(data);
      await operatorsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const operador = await this.readOperator(data)
      return operador;
    } catch (error) {
      return error;
    }
  }

  static async deleteOperator(data: Operators) {
    try {
      await this.readToUpdate(data);
      await operatorsRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const operator = await this.readOperator(data)
    let uuid = uuidv4();
    let operatorHistory = {
      uuid: uuid,
      name: operator.name,
      phone: operator.phone,
      email: operator.email,
      username: operator.username,
      password: operator.password,
      id_role: operator.id_role,
      licence_number: operator.licence_number,
      due_date_licence: operator.due_date_licence,
      updated_by: data.updated_by,
    }
    return await operatorsHistoryRepository.save(operatorHistory)
  }

  static async readUser(data: any) {
    try {
      //Buscamos y obtenemos el operador
      const operador = await operatorsRepository.createQueryBuilder('operador')
        .where({
          deleted: 0,
          active: 1,
          uuid: data.uuid
        })
        .select([
          'operador.id as id',
          'operador.uuid as uuid',
          'operador.name as name',
          'operador.email as email',
          'operador.username as username',
          'operador.token as token',
          'operador.id_role as id_role',
          'operador.active as active',
          'operador.user_type as user_type',
        ])
        .leftJoin(Roles, 'role', 'operador.id_role = role.id')
        .getRawOne();
      //Retornamos el operador encontrado
      return operador;
    } catch (error) {
      return error
    }
  }

}