import { AppDataSource } from '../../config/connection';
import { SupplierBankAccounts } from '../../entity/RED/SupplierBankAccounts';
import { SupplierContacts } from '../../entity/RED/SupplierContacts';
import { Suppliers } from '../../entity/RED/Suppliers';
import { v4 as uuidv4 } from 'uuid';
import { SupplierUnits } from '../../entity/RED/SupplierUnits';
import { SuppliersCoverage } from '../../entity/RED/SupplierCoverage';

const suppliersRepository = AppDataSource.getRepository(Suppliers);
const supplierContactsRepository = AppDataSource.getRepository(SupplierContacts);
const supplierBankAccountsRepository = AppDataSource.getRepository(SupplierBankAccounts);

export class supplierTransactions {

  static async createSupplier(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      //Ingresamos los datos del nuevo supplier
      const supplier = await suppliersRepository.save(newData)
      const newSupplier = await this.readSupplier(supplier);
      //Retornamos el resultado del insertado de supplier
      return newSupplier
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSupplier(data: any) {
    try {
      //Buscamos el supplier por medio del id
      const supplier = await suppliersRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplier retornamos un error
      if (!supplier) {
        return 'error';
      }
      delete data.id
      //Si existe el supplier procedemos a actualizarlo
      await suppliersRepository.update({ id: supplier.id }, data);
      //Obtenemos el dato actualizado
      const supplierUpdated = await this.readSupplier(data);
      //Retornamos los datos actualizados
      return supplierUpdated;
    } catch (error) {
      return error
    }
  }

  static async readSuppliers() {
    try {
      const suppliers = await suppliersRepository.createQueryBuilder('suppliers')
        .where({
          deleted: 0,
          active: 1
        })
        .select([
          'suppliers.id as "id"',
          'suppliers.uuid as "uuid"',
          'suppliers.social_reazon as "social_reazon"',
          'suppliers.rfc as rfc',
          'suppliers.eventSupport as "eventSupport"',
          'suppliers.active as active',
          'contactos.id as "contactoId"',
          'contactos.name as "contactoNombre"',
          'contactos.email as "contactoEmail"',
          'contactos.phone as "contactoTelefono"',
          'contactos.active as "contactoActive"',
          'bancos.id as "bancosId"',
          'bancos.bank as "bancosNombre"',
          'bancos.clabe_number as "bancosClabe"',
          'bancos.account_number as "bancosCuenta"',
          'bancos.active as "bancoActive"',
          'unidades.id as "unidadesId"',
          'unidades.unit_number as "unitNumber"',
          'unidades.active as "unidadesActive"',
        ])
        .leftJoin(SupplierContacts, 'contactos', 'contactos.deleted = :deletedContact AND contactos.id_supplier = suppliers.id', { deletedContact: 0 })
        .leftJoin(SupplierBankAccounts, 'bancos', 'bancos.deleted = :deletedBank AND bancos.id_supplier = suppliers.id', { deletedBank: 0 })
        .leftJoin(SupplierUnits, 'unidades', 'unidades.deleted = :deletedUnit AND unidades.id_supplier = suppliers.id', { deletedUnit: 0 })
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const suppliersMap = new Map<number, any>();

      suppliers.forEach((supplier: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!suppliersMap.has(supplier.id)) {
          suppliersMap.set(supplier.id, {
            id: supplier.id,
            uuid: supplier.uuid,
            social_reazon: supplier.social_reazon,
            rfc: supplier.rfc,
            eventSupport: supplier.eventSupport,
            active: supplier.active,
            contactos: [],
            bancos: [],
            unidades: [],
            expandContacts: false,
            expandBanks: false,
            expandUnits: false,
          });
        }

        // Agregar contacto si no existe en la lista de contactos
        const existingContacts = suppliersMap.get(supplier.id).contactos;
        const contactExists = existingContacts.some((contact: any) => contact.id === supplier.contactoId);

        if (supplier.contactoId && !contactExists) {
          suppliersMap.get(supplier.id).contactos.push({
            id: supplier.contactoId,
            name: supplier.contactoNombre,
            email: supplier.contactoEmail,
            phone: supplier.contactoTelefono,
            active: supplier.contactoActive,
          });
        }

        // Agregar banco si no existe en la lista de bancos
        const existingBanks = suppliersMap.get(supplier.id).bancos;
        const bankExists = existingBanks.some((bank: any) => bank.id === supplier.bancosId);

        if (supplier.bancosId && !bankExists) {
          suppliersMap.get(supplier.id).bancos.push({
            id: supplier.bancosId,
            bank: supplier.bancosNombre,
            clabe_number: supplier.bancosClabe,
            account_number: supplier.bancosCuenta,
            active: supplier.bancoActive,
          });
        }

        // Agregar banco si no existe en la lista de unidades
        const existingUnits = suppliersMap.get(supplier.id).unidades;
        const UnitsExists = existingUnits.some((unit: any) => unit.id === supplier.unidadesId);

        if (supplier.unidadesId && !UnitsExists) {
          suppliersMap.get(supplier.id).unidades.push({
            id: supplier.unidadesId,
            unit_number: supplier.unitNumber,
            active: supplier.bancoActive,
          });
        }
      });

      // Convertir el mapa de suppliers en un arreglo
      let suppliersTransform = Array.from(suppliersMap.values());

      // Retornar todos los suppliers transformados
      return suppliersTransform;

    } catch (error) {
      return error;
    }
  }

  static async readSupplier(data: any) {
    try {
      //Buscamos un supplier por medio del id para obtener su información
      const supplier = await suppliersRepository.createQueryBuilder('suppliers')
        .select([
          'suppliers.id as "id"',
          'suppliers.social_reazon as "social_reazon"',
          'suppliers.rfc as rfc',
          'suppliers.zip_code as zip_code',
          'suppliers.neighborhood as neighborhood',
          'suppliers.city as city',
          'suppliers.state as state',
          'suppliers.country as country',
          'suppliers.street_number as street_number',
          'suppliers.internal_number as internal_number',
          'suppliers.street as street',
          'suppliers.active as active',
        ])
        .where({
          id: data.id,
          deleted: 0
        })
        .getRawOne();
      //Retornamos el supplier
      return supplier;
    } catch (error) {

      return error
    }
  }

  static async disableSupplier(data: any) {
    try {
      //Buscamos el supplier por medio del id
      const supplier = await suppliersRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplier retornamos un error
      if (!supplier) {
        return 'error';
      }
      //Si existe el supplier procedemos a actualizarlo
      await suppliersRepository.update({ id: data.id }, { active: 0, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readSupplier(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async enableSupplier(data: any) {
    try {
      //Buscamos el supplier por medio del id
      const supplier = await suppliersRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplier retornamos un error
      if (!supplier) {
        return 'error';
      }
      //Si existe el supplier procedemos a actualizarlo
      await suppliersRepository.update({ id: data.id }, { active: 1, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readSupplier(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async deleteSupplier(data: any) {
    try {
      //Buscamos el supplier por medio del id
      const supplier = await suppliersRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplier retornamos un error
      if (!supplier) {
        return 'error';
      }
      //Si existe el supplier procedemos a actualizarlo
      const supplierUpdated = await suppliersRepository.update({ id: data.id }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      //Retornamos los datos actualizados
      return supplierUpdated;
    } catch (error) {
      return error
    }
  }

  static async filterSupplier(data: any) {
    const supplier = await suppliersRepository.createQueryBuilder('suppliers')
      .where({
        active: 1,
        deleted: 0
      })
      .select([
        'suppliers.id as "id"',
        'suppliers.social_reazon as "social_reazon"',
        'suppliers.rfc as rfc',
        'suppliers.zip_code as zip_code',
        'suppliers.neighborhood as neighborhood',
        'suppliers.city as city',
        'suppliers.state as state',
        'suppliers.country as country',
        'suppliers.street_number as street_number',
        'suppliers.internal_number as internal_number',
        'suppliers.street as street',
        'suppliers.active as active',
      ])
      .leftJoin(SuppliersCoverage, 'coverage', 'coverage.id_supplier = suppliers.id') // Hacemos el join entre ambas tablas
      .where('suppliers.state LIKE :state', { state: '%' + data.state + '%' }) // Filtro para el estado en la tabla Medics
      .andWhere('coverage.coverage_place LIKE :coverage_place', { coverage_place: '%' + data.municipality + '%' }) // Filtro para el municipio en la tabla Coverage
      .getRawMany();
    return supplier;
  } catch(error) {
    return error;
  }

}