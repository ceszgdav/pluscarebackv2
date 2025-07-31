import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { SupplierUnits } from '../../entity/RED/SupplierUnits';
import { SupplierUnitPhotos } from '../../entity/RED/SupplierUnitsPhotos';

const supplierUnitsRepository = AppDataSource.getRepository(SupplierUnits);
const supplierPhotosUnitsRespository = AppDataSource.getRepository(SupplierUnitPhotos);

export class supplierUnitsTransactions {

  static async uploadSupplierUnits(data: any) {
    try {
      let files: any[] = []
      //Recorremos el arreglo de las fotos
      for (const fotos of data) {
        let uuid = uuidv4();
        //obtenemos el nombre del fichero
        let file = fotos.filename
        files.push(file)
        //Agregamos el uuid al nuevo registro
        let newPicture = { file, uuid };
        //Ingresamos los datos del nuevo supplierContact
        await supplierPhotosUnitsRespository.save(newPicture)
      }
      //Retornamos el resultado del insertado de supplierContact
      return files
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createSupplierUnits(data: any) {
    try {
      //Creamos el uuid para el area
      let uuid = uuidv4();
      //Asignamos el uuid a la unidad
      let newUnit = { ...data, uuid }
      //Creamos la unidad del proveedor
      newUnit = await supplierUnitsRepository.save(newUnit)
      //Obtenemos la informacion de la unidad creada
      newUnit = await this.readSupplierUnits(newUnit)
      //Asignamos el id para la unidad
      let id_supplier_unit = newUnit.id
      //Recorremos el arreglo de las fotos
      for (const fotos of data.files) {
        let file = fotos
        //Agregamos el uuid al nuevo registro
        let newPicture = { id_supplier_unit };
        //Si existe el supplierUnits procedemos a actualizarlo
        await supplierPhotosUnitsRespository.update({ file: fotos }, newPicture);
      }
      //Obtenemos la informacion de la unidad con imagenes
      newUnit = await this.readSupplierUnitsWithPhotos(newUnit)
      //Retornamos el resultado del insertado de supplierContact
      return newUnit
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSupplierUnits(data: any) {
    try {
      //Buscamos el supplierUnits por medio del uuid
      const supplierUnits = await supplierUnitsRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierUnits retornamos un error
      if (!supplierUnits) {
        return 'error';
      }
      //Si existe el supplierUnits procedemos a actualizarlo
      await supplierUnitsRepository.update({ id: data.id }, data);
      //Obtenemos el dato updated
      const UnitsUpdated = await this.readSupplierUnits(data);
      //Retornamos los datos updateds
      return UnitsUpdated;
    } catch (error) {
      return error
    }
  }

  static async readSupplierUnits(data: any) {
    try {
      //Buscamos y obtenemos todos los tipos de supplierUnits
      const units = await supplierUnitsRepository.createQueryBuilder('units')
        .where({
          id: data.id,
          deleted: 0,
        })
        .select([
          'units.id as id',
          'units.unit_number as unit_number',
          'units.active as active',
          'up.id as "fileId"',
          'up.file as "fileFile"'
        ])
        .leftJoin(SupplierUnitPhotos, 'up', 'up.deleted = :deletedUnit AND up.id_supplier_unit = units.id', { deletedUnit: 0 })
        .getRawMany();
      // Crear un mapa para agrupar contactos y bancos por proveedor
      const unitsMap = new Map<number, any>();

      units.forEach((actualUnit: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!unitsMap.has(actualUnit.id)) {
          unitsMap.set(actualUnit.id, {
            id: actualUnit.id,
            uuid: actualUnit.uuid,
            unit_number: actualUnit.unit_number,
            unidades: []
          });
        }

        // Agregar contacto si no existe en la lista de contactos
        const existingUnit = unitsMap.get(actualUnit.id).unidades;
        const unitExists = existingUnit.some((unit: any) => unit.id === actualUnit.fileId);

        if (actualUnit.fileId && !unitExists) {
          unitsMap.get(actualUnit.id).unidades.push({
            id: actualUnit.fileId,
            file: actualUnit.fileFile
          });
        }
      })

      // Convertir el mapa de suppliers en un arreglo
      let unitsTransform = Array.from(unitsMap.values());

      // Retornar todos los suppliers transformados
      return unitsTransform[0];
    } catch (error) {
      return error
    }
  }

  static async readSupplierUnitsWithPhotos(data: any) {
    try {
      //Buscamos y obtenemos todos los tipos de supplierUnits
      const units = await supplierUnitsRepository.createQueryBuilder('units')
        .where({
          id: data.id,
          deleted: 0,
        })
        .select([
          'units.id as id',
          'units.uuid as uuid',
          'units.unit_number as unit_number',
          'units.active as active',
          'photos.id as "photosId"',
          'photos.file as "photoFile"',
          'photos.active as "photoActive"',
        ])
        .leftJoin(SupplierUnitPhotos, 'photos', 'photos.deleted = :deletedPhoto AND photos.id_supplier_unit = units.id', { deletedPhoto: 0 })
        .getRawMany();

      // Crear un mapa para agrupar contactos y bancos por proveedor
      const unitsMap = new Map<number, any>();

      units.forEach((unit: any) => {
        // Si el proveedor no existe en el mapa, lo añadimos
        if (!unitsMap.has(unit.id)) {
          unitsMap.set(unit.id, {
            id: unit.id,
            uuid: unit.uuid,
            unit_number: unit.unit_number,
            unidades: [],
          });
        }

        // Agregar contacto si no existe en la lista de unidades
        const existingUnits = unitsMap.get(unit.id).unidades;
        const contactExists = existingUnits.some((photo: any) => photo.id === unit.photosId);

        if (unit.photosId && !contactExists) {
          unitsMap.get(unit.id).unidades.push({
            id: unit.photosId,
            file: unit.photoFile,
            active: unit.photoActive,
          });
        }
      });
      // Convertir el mapa de suppliers en un arreglo
      let unitsTransform = Array.from(unitsMap.values());
      // Retornar todos los suppliers transformados
      return unitsTransform;
    } catch (error) {
      return error
    }
  }

  static async deleteSupplierUnits(data: any) {
    try {
      //Buscamos el supplierUnits por medio del uuid
      const supplierUnits = await supplierUnitsRepository.findOneBy({ id: data.id });
      //En caso de que no exista el supplierUnits retornamos un error
      if (!supplierUnits) {
        return 'error';
      }
      //Si existe el supplierUnits procedemos a actualizarlo
      const UnitsUpdated = await supplierUnitsRepository.update({ id: data.id }, data);
      //Retornamos los datos updateds
      return UnitsUpdated;
    } catch (error) {
      return error
    }
  }


}