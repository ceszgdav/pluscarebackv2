import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { SupplierBankAccounts } from '../../entity/RED/SupplierBankAccounts';

const supplierBankAccountRepository = AppDataSource.getRepository(SupplierBankAccounts);

export class supplierBankAccountTransactions {

  static async createSupplierBankAccount(data: any) {
    try {
      //Creamos el uuid para el area
      for (const cuentaBancaria of data.supplier_bank_account) {
        let uuid = uuidv4();
        //Agregamos el uuid al nuevo registro
        let newData = { ...cuentaBancaria, uuid };
        //Ingresamos los datos del nuevo supplierContact
        await supplierBankAccountRepository.save(newData)
      }
      //Retornamos el resultado del insertado de supplierContact
      return 'ok'
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createSingleSupplierBankAccount(data: any) {
    try {
      //Creamos el uuid para el area
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid };
      //Ingresamos los datos del nuevo supplierContact
      let newBank = await supplierBankAccountRepository.save(newData)
      //Obtenemos la informacion de la cuenta creada
      newBank = await this.readSupplierBankAccount(newBank)
      //Retornamos el resultado del insertado de supplierContact
      return newBank
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSupplierBankAccount(data: any) {
    try {
      //Buscamos el supplierBankAccount por medio del uuid
      const supplierBankAccount = await supplierBankAccountRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierBankAccount retornamos un error
      if (!supplierBankAccount) {
        return 'error';
      }
      //Si existe el supplierBankAccount procedemos a actualizarlo
      await supplierBankAccountRepository.update({ id: data.id }, data);
      //Obtenemos el dato updated
      const BankAccountUpdated = await this.readSupplierBankAccount(data);
      //Retornamos los datos updateds
      return BankAccountUpdated;
    } catch (error) {
      return error
    }
  }

  static async readSupplierBankAccount(data: any) {
    try {
      //Buscamos y obtenemos todos los tipos de supplierBankAccount
      const roles = await supplierBankAccountRepository.createQueryBuilder('cb')
        .where({
          id: data.id,
          deleted: 0,
        })
        .select([
          'cb.id as id',
          'cb.bank as bank',
          'cb.clabe_number as clabe_number',
          'cb.account_number as "account_number"',
          'cb.active as active',
        ])
        .getRawOne();
      //Retornamos todos los tipos de supplierBankAccount
      return roles;
    } catch (error) {
      return error
    }
  }

  static async readSupplierBankAccounts(data: any) {
    try {
      //Buscamos un supplierBankAccount por medio del uuid para obtener su información
      const supplierBankAccount = await supplierBankAccountRepository.createQueryBuilder('cb')
        .where({
          uuid: data.uuid,
        })
        .select([
          'cb.id as id',
          'cb.uuid as uuid',
          'cb.nombre as nombre',
          'cb.apellidos as "apellidos"',
          'cb.email as "email"',
          'cb.telefono as telefono',
          'cb.active as active',
        ])
        .getRawOne();
      //Retornamos el supplierBankAccount
      return supplierBankAccount;
    } catch (error) {
      return error
    }
  }

  static async disableSupplierBankAccount(data: any) {
    try {
      //Buscamos el supplierBankAccount por medio del uuid
      const supplierBankAccount = await supplierBankAccountRepository.findOneBy({ uuid: data.uuid });
      //En caso de que no exista el supplierBankAccount retornamos un error
      if (!supplierBankAccount) {
        return 'error';
      }
      //Si existe el supplierBankAccount procedemos a actualizarlo
      await supplierBankAccountRepository.update({ uuid: data.uuid }, data);
      //Obtenemos el dato updated
      const updated = await this.readSupplierBankAccount(data);
      //Retornamos los datos updateds
      return updated;
    } catch (error) {
      return error
    }
  }

  static async enableSupplierBankAccount(data: any) {
    try {
      //Buscamos el supplierBankAccount por medio del uuid
      const supplierBankAccount = await supplierBankAccountRepository.findOneBy({ uuid: data.uuid });
      //En caso de que no exista el supplierBankAccount retornamos un error
      if (!supplierBankAccount) {
        return 'error';
      }
      //Si existe el supplierBankAccount procedemos a actualizarlo
      await supplierBankAccountRepository.update({ uuid: data.uuid }, data);
      //Obtenemos el dato updated
      const updated = await this.readSupplierBankAccount(data);
      //Retornamos los datos updateds
      return updated;
    } catch (error) {
      return error
    }
  }

  static async deleteSupplierBankAccount(data: any) {
    try {
      //Buscamos el supplierBankAccount por medio del uuid
      const supplierBankAccount = await supplierBankAccountRepository.findOneBy({ uuid: data.uuid });
      //En caso de que no exista el supplierBankAccount retornamos un error
      if (!supplierBankAccount) {
        return 'error';
      }
      //Si existe el supplierBankAccount procedemos a actualizarlo
      const BankAccountUpdated = await supplierBankAccountRepository.update({ uuid: data.uuid }, data);
      //Retornamos los datos updateds
      return BankAccountUpdated;
    } catch (error) {
      return error
    }
  }


}