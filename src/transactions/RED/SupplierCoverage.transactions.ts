import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { SuppliersCoverage } from '../../entity/RED/SupplierCoverage';

const supplierCoverageRepository = AppDataSource.getRepository(SuppliersCoverage);

export class supplierCoverageTransactions {

  static async createSupplierCoverage(data: any) {
    try {
      //Creamos el uuid para el area
      for (const coverage of data.supplier_coverage) {
        let uuid = uuidv4();
        //Agregamos el uuid al nuevo registro
        let newData = { ...coverage, uuid };
        //Ingresamos los datos del nuevo supplierContact
        await supplierCoverageRepository.save(newData)
      }
      //Retornamos el resultado del insertado de supplierContact
      return 'ok'
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }
}