import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { SupplierContacts } from '../../entity/RED/SupplierContacts';

const supplierContactRepository = AppDataSource.getRepository(SupplierContacts);

export class supplierContactTransactions {

  static async createSupplierContact(data: any) {
    try {
      //Creamos el uuid para el area
      for (const contacto of data.supplier_contact) {
        let uuid = uuidv4();
        //Agregamos el uuid al nuevo registro
        let newData = { ...contacto, uuid };
        //Ingresamos los datos del nuevo supplierContact
        await supplierContactRepository.save(newData)
      }
      //Retornamos el resultado del insertado de supplierContact
      return 'ok'
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createSingleSupplierContact(data: any) {
    try {
      //Creamos el uuid para el area
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid };
      //Ingresamos los datos del nuevo supplierContact
      let newContact = await supplierContactRepository.save(newData)
      //Obtenemos la informacion del nuevo registro
      newContact = await this.readSupplierContact(newContact)
      //Retornamos el resultado del insertado de supplierContact
      return newContact
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSupplierContact(data: any) {
    try {
      //Buscamos el supplierContact por medio del uuid
      const supplierContact = await supplierContactRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierContact retornamos un error
      if (!supplierContact) {
        return 'error';
      }
      //Si existe el supplierContact procedemos a actualizarlo
      await supplierContactRepository.update({ id: data.id }, data);
      //Obtenemos el dato updated
      const contactUpdated = await this.readSupplierContact(data);
      //Retornamos los datos updateds
      return contactUpdated;
    } catch (error) {
      return error
    }
  }

  static async readSupplierContact(data: any) {
    try {
      //Buscamos y obtenemos todos los tipos de supplierContact
      const roles = await supplierContactRepository.createQueryBuilder('contacto')
        .where({
          id: data.id,
          deleted: 0,
        })
        .select([
          'contacto.id as id',
          'contacto.uuid as uuid',
          'contacto.name as name',
          'contacto.email as "email"',
          'contacto.phone as phone',
          'contacto.active as active',
        ])
        .getRawOne();
      //Retornamos todos los tipos de supplierContact
      return roles;
    } catch (error) {
      return error
    }
  }

  static async readSupplierContacts(data: any) {
    try {
      //Buscamos un supplierContact por medio del uuid para obtener su información
      const supplierContact = await supplierContactRepository.createQueryBuilder('contacto')
        .where({
          uuid: data.uuid,
        })
        .select([
          'contacto.id as id',
          'contacto.uuid as uuid',
          'contacto.nombre as nombre',
          'contacto.apellidos as "apellidos"',
          'contacto.email as "email"',
          'contacto.telefono as telefono',
          'contacto.active as active',
        ])
        .getRawOne();
      //Retornamos el supplierContact
      return supplierContact;
    } catch (error) {
      return error
    }
  }

  static async disableSupplierContact(data: any) {
    try {
      //Buscamos el supplierContact por medio del uuid
      const supplierContact = await supplierContactRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierContact retornamos un error
      if (!supplierContact) {
        return 'error';
      }
      //Si existe el supplierContact procedemos a actualizarlo
      await supplierContactRepository.update({ id: data.id }, data);
      //Obtenemos el dato updated
      const updated = await this.readSupplierContact(data);
      //Retornamos los datos updateds
      return updated;
    } catch (error) {
      return error
    }
  }

  static async enableSupplierContact(data: any) {
    try {
      //Buscamos el supplierContact por medio del uuid
      const supplierContact = await supplierContactRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierContact retornamos un error
      if (!supplierContact) {
        return 'error';
      }
      //Si existe el supplierContact procedemos a actualizarlo
      await supplierContactRepository.update({ id: data.id }, data);
      //Obtenemos el dato updated
      const updated = await this.readSupplierContact(data);
      //Retornamos los datos updateds
      return updated;
    } catch (error) {
      return error
    }
  }

  static async deleteSupplierContact(data: any) {
    try {
      //Buscamos el supplierContact por medio del uuid
      const supplierContact = await supplierContactRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierContact retornamos un error
      if (!supplierContact) {
        return 'error';
      }
      //Si existe el supplierContact procedemos a actualizarlo
      const contactUpdated = await supplierContactRepository.update({ id: data.id }, data);
      //Retornamos los datos updateds
      return contactUpdated;
    } catch (error) {
      return error
    }
  }


}