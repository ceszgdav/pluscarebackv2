import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { ProgrammedIncident } from '../../entity/SERV/ProgrammedIncident';
import { Suppliers } from '../../entity/RED/Suppliers';
import { Paramedics } from '../../entity/ADM/Paramedics';
import { Operators } from '../../entity/ADM/Operators';
import { Units } from '../../entity/ADM/Units';

const programmedServiceRepository = AppDataSource.getRepository(ProgrammedIncident);

export class programmedServiceTransactions {

  static async createProgrammedService(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      //Ingresamos los datos del nuevo servicioProgramado
      const servicioProgramado = await programmedServiceRepository.save(newData)
      const newProgrammedService = await this.readProgrammedService(servicioProgramado);
      //Retornamos el resultado del insertado de servicioProgramado
      return newProgrammedService
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateProgrammedService(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await programmedServiceRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      delete data.id
      //Si existe el servicioProgramado procedemos a actualizarlo
      await programmedServiceRepository.update({ id: servicioProgramado.id }, data);
      //Obtenemos el dato actualizado
      const ProgrammedServiceUpdated = await this.readProgrammedService(data);
      //Retornamos los datos actualizados
      return ProgrammedServiceUpdated;
    } catch (error) {
      return error
    }
  }

  static async readProgrammedServices() {
    try {
      const date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const servicioProgramado = await programmedServiceRepository.createQueryBuilder('programmedService')
        .where({
          deleted: 0,
          active: 1
        })
        .andWhere(
          `programmedService.date BETWEEN '${firstDay.toISOString()}' AND '${lastDay.toISOString()}'`
        )
        .select([
          'programmedService.id as "id"',
          'programmedService.uuid as "uuid"',
          'programmedService.id_supplier as "id_supplier"',
          'programmedService.date as date',
          'programmedService.description as "description"',
          'programmedService.hour as hour',
          'programmedService.pluscare_cost as "pluscare_cost"',
          'programmedService.supplier_cost as "supplier_cost"',
          'programmedService.supplier_folio as "supplier_folio"',
          'programmedService.active as active',
        ])
        .getRawMany();

      // Obtener el mes y el año actuales
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Obtener el número de días en el mes actual
      const dayOfTheMonth = new Date(year, month, 0).getDate();

      // Inicializar el objeto listDataMap
      let listDataMap = {};

      // Recorrer cada día del mes
      for (let index = 1; index <= dayOfTheMonth; index++) {
        // Filtrar servicios programados para el día específico
        const servicesForDay = servicioProgramado.filter(service => {
          const serviceDate = new Date(service.date);
          return serviceDate.getDate() === index &&
            serviceDate.getMonth() + 1 === month &&
            serviceDate.getFullYear() === year;
        });

        // Si hay servicios para ese día, los agregamos al map
        if (servicesForDay.length > 0) {
          listDataMap[index] = servicesForDay.map(service => ({
            type: 'success', // Puedes cambiar el tipo basado en algún criterio si lo deseas
            content: {
              id: service.id,
              Service: service.description,
              Hour: service.hour,
              Date: service.date
            }
          }));
        }
      }
      // Retornar todos los programmedService transformados
      return listDataMap;
    } catch (error) {
      return error;
    }
  }

  static async readProgrammedService(data: any) {
    try {
      //Buscamos un servicioProgramado por medio del id para obtener su información
      const servicioProgramado = await programmedServiceRepository.createQueryBuilder('programmedService')
        .where({
          deleted: 0,
          active: 1,
          id: data.id
        })
        .select([
          'programmedService.id as "id"',
          'programmedService.uuid as "uuid"',
          'programmedService.id_supplier as "id_supplier"',
          'programmedService.date as date',
          'programmedService.description as "description"',
          'programmedService.plates as "plates"',
          'programmedService.hour as hour',
          'programmedService.pluscare_cost as "pluscare_cost"',
          'programmedService.supplier_cost as "supplier_cost"',
          'programmedService.client_name as client_name',
          'programmedService.supplier_folio as "supplier_folio"',
          'programmedService.active as active',
          'supplier.social_reazon as social_reazon',
          'paramedics.name as paramedic_name',
          'operators.name as operator_name',
          'units.unit_name as unit_name',

        ])
        .leftJoin(Suppliers, 'supplier', 'supplier.deleted = :deletedSupplier AND supplier.id = programmedService.id_supplier', { deletedSupplier: 0 })
        .leftJoin(Paramedics, 'paramedics', 'paramedics.deleted = :deletedParamedic AND paramedics.id = programmedService.id_paramedic', { deletedParamedic: 0 })
        .leftJoin(Operators, 'operators', 'operators.deleted = :deletedOperator AND operators.id = programmedService.id_operator', { deletedOperator: 0 })
        .leftJoin(Units, 'units', 'units.deleted = :deletedUnit AND units.id = programmedService.id_unit', { deletedUnit: 0 })
        .getRawOne();
      //Retornamos el servicioProgramado
      return servicioProgramado;
    } catch (error) {

      return error
    }
  }

  static async disableProgrammedService(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await programmedServiceRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await programmedServiceRepository.update({ id: data.id }, { active: 0, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readProgrammedService(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async enableProgrammedService(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await programmedServiceRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await programmedServiceRepository.update({ id: data.id }, { active: 1, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readProgrammedService(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async deleteProgrammedService(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await programmedServiceRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      const ProgrammedServiceUpdated = await programmedServiceRepository.update({ id: data.id }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      //Retornamos los datos actualizados
      return ProgrammedServiceUpdated;
    } catch (error) {
      return error
    }
  }


}