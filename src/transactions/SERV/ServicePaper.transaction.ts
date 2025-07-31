import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { Suppliers } from '../../entity/RED/Suppliers';
import { Paramedics } from '../../entity/ADM/Paramedics';
import { Operators } from '../../entity/ADM/Operators';
import { Units } from '../../entity/ADM/Units';
import { ServicePaper } from '../../entity/SERV/ServicePaper';
import { Incidents } from '../../entity/SERV/Incidents';
import { ServiceType } from '../../entity/CAT/ServiceTypes';
import { ServicePaperMedicAtHome } from '../../entity/SERV/ServicePaperMedicAtHome';
import { MedicalReport } from '../../entity/SERV/MedicalReport';

const ServicePaperRepository = AppDataSource.getRepository(ServicePaper);

const ServicePaperAtHomeRepository = AppDataSource.getRepository(ServicePaperMedicAtHome);

const medicalReportRepository = AppDataSource.getRepository(MedicalReport);

export class ServicePaperTransactions {

  static async createServicePaper(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      let place_occurrence = data.place_occurrence[0]
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid, place_occurrence }
      if (newData.unit === 0) {
        delete newData.unit
        delete newData.operator
        delete newData.id_paramedic
      }
      //Ingresamos los datos del nuevo servicioProgramado
      const servicioProgramado = await ServicePaperRepository.save(newData)
      const newServicePaper = await this.readServicePaper(servicioProgramado);
      //Retornamos el resultado del insertado de servicioProgramado
      return newServicePaper
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createServicePaperAtHome(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      let place_occurrence = data.place_occurrence[0]
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid, place_occurrence }
      if (newData.unit === 0) {
        delete newData.unit
        delete newData.operator
        delete newData.id_paramedic
      }
      //Ingresamos los datos del nuevo servicioProgramado
      const servicioProgramado = await ServicePaperAtHomeRepository.save(newData)
      const newServicePaper = await this.readServicePaper(servicioProgramado);
      //Retornamos el resultado del insertado de servicioProgramado
      return newServicePaper
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateServicePaper(data: any) {
    try {
      console.log(data)
      delete data.place_occurrences
      delete data.passwordServicePaper
      let place_occurrence = data.place_occurrence[0]
      //Agregamos el uuid al nuevo registro
      data = { ...data, place_occurrence }
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await ServicePaperRepository.findOneBy({ uuid: data.uuid });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      delete data.id
      //Si existe el servicioProgramado procedemos a actualizarlo
      await ServicePaperRepository.update({ uuid: servicioProgramado.uuid }, data);
      //Obtenemos el dato actualizado
      const ServicePaperUpdated = await this.readServicePaper(data);
      //Retornamos los datos actualizados
      return ServicePaperUpdated;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async readServicePapers() {
    try {
      const servicioProgramado = await ServicePaperRepository.createQueryBuilder('ServicePaper')
        .where({
          deleted: 0,
          active: 1
        })
        .orderBy('ServicePaper.id', 'DESC')
        .select([
          'ServicePaper.id as "id"',
          'ServicePaper.uuid as "uuid"',
          'ServicePaper.folio as "folio"',
          'ServicePaper.date as date',
          'ServicePaper.received_call as "received_call"',
          'ServicePaper.place_occurrence as place_occurrence',
          'ServicePaper.active as active',
          'ServicePaper.initialized as "initialized"',
          'serviceType.name as "serviceType"',
        ])
        .leftJoin(ServiceType, 'serviceType', 'ServicePaper.place_occurrence = serviceType.id')
        .getRawMany();

      // Retornar todos los ServicePaper transformados
      return servicioProgramado;
    } catch (error) {
      return error;
    }
  }

  static async readServicePaper(data: any) {
    try {
      //Buscamos un servicioProgramado por medio del id para obtener su información
      const servicioProgramado = await ServicePaperRepository.createQueryBuilder('ServicePaper')
        .where({
          deleted: 0,
          active: 1,
          uuid: data.uuid
        })
        .select([
          'ServicePaper.id as "id"',
          'ServicePaper.uuid as "uuid"',
          'ServicePaper.folio as "folio"',
          'ServicePaper.creation_event_place as "creation_event_place"',
          'ServicePaper.date as "date"',
          'ServicePaper.programmed as "programmed"',
          'ServicePaper.external as "external"',
          'ServicePaper.received_call as "received_call"',
          'ServicePaper.id_insurance as "id_insurance"',
          'ServicePaper.activation_call as "activation_call"',
          'ServicePaper.place_occurrence as "place_occurrence"',
          'ServicePaper.answer_call as "answer_call"',
          'ServicePaper.service_cost as "service_cost"',
          'ServicePaper.iva as "iva"',
          'ServicePaper.expedient as "expedient"',
          'ServicePaper.requester as "requester"',
          'ServicePaper.patient_name as "patient_name"',
          'ServicePaper.patient_year as "patient_year"',
          'ServicePaper.patient_diagnostic as "patient_diagnostic"',
          'ServicePaper.patient_weight as "patient_weight"',
          'ServicePaper.patient_phone as "patient_phone"',
          'ServicePaper.patient_address as "patient_address"',
          'ServicePaper.patient_address_destiny as "patient_address_destiny"',
          'ServicePaper.arrive_hour as "arrive_hour"',
          'ServicePaper.observation as "observation"',
          'ServicePaper.contact_hour as "contact_hour"',
          'ServicePaper.finished_hour as "finished_hour"',
          'ServicePaper.name_support as "name_support"',
          'ServicePaper.equipment_used_support as "equipment_used_support"',
          'ServicePaper.cost_support as "cost_support"',
          'ServicePaper.deducible_support as "deducible_support"',
          'ServicePaper.units as "units"',
          'ServicePaper.operators as "operators"',
          'ServicePaper.unit as "unit"',
          'ServicePaper.operator as "operator"',
          'ServicePaper.id_paramedic as "id_paramedic"',
          'ServicePaper.paramedic as "paramedic"',
          'ServicePaper.departure_time as "departure_time"',
          'ServicePaper.on_site as "on_site"',
          'ServicePaper.with_frap as "with_frap"',
          'ServicePaper.start_transfer as "start_transfer"',
          'ServicePaper.with_recipe as "with_recipe"',
          'ServicePaper.on_hospital as "on_hospital"',
          'ServicePaper.with_report as "with_report"',
          'ServicePaper.email_serv_ambulance as "email_serv_ambulance"',
        ])
        // .leftJoin(Suppliers, 'supplier', 'supplier.deleted = :deletedSupplier AND supplier.id = ServicePaper.id_supplier', { deletedSupplier: 0 })
        // .leftJoin(Paramedics, 'paramedics', 'paramedics.deleted = :deletedParamedic AND paramedics.id = ServicePaper.id_paramedic', { deletedParamedic: 0 })
        // .leftJoin(Operators, 'operators', 'operators.deleted = :deletedOperator AND operators.id = ServicePaper.id_operator', { deletedOperator: 0 })
        // .leftJoin(Units, 'units', 'units.deleted = :deletedUnit AND units.id = ServicePaper.id_unit', { deletedUnit: 0 })
        .getRawOne();
      //Retornamos el servicioProgramado
      return servicioProgramado;
    } catch (error) {

      return error
    }
  }

  static async readServicePaperAtHome(data: any) {
    try {
      //Buscamos un servicioProgramado por medio del id para obtener su información
      const servicioProgramado = await ServicePaperAtHomeRepository.createQueryBuilder('ServicePaper')
        .where('ServicePaper.deleted = :deleted', { deleted: 0 })
        .andWhere('ServicePaper.active = :active', { active: 1 })
        .andWhere('ServicePaper.expedient = :expedient', { expedient: data.expedient })
        .andWhere('ServicePaper.passwordServicePaper = :password', { password: data.password })
        .select([
          'ServicePaper.id as "id"',
          'ServicePaper.uuid as "uuid"',
          'ServicePaper.folio as "folio"',
          'ServicePaper.creation_event_place as "creation_event_place"',
          'ServicePaper.date as "date"',
          'ServicePaper.programmed as "programmed"',
          'ServicePaper.external as "external"',
          'ServicePaper.received_call as "received_call"',
          'ServicePaper.id_insurance as "id_insurance"',
          'ServicePaper.activation_call as "activation_call"',
          'ServicePaper.place_occurrence as "place_occurrence"',
          'ServicePaper.answer_call as "answer_call"',
          'ServicePaper.service_cost as "service_cost"',
          'ServicePaper.expedient as "expedient"',
          'ServicePaper.requester as "requester"',
          'ServicePaper.patient_name as "patient_name"',
          'ServicePaper.patient_year as "patient_year"',
          'ServicePaper.patient_diagnostic as "patient_diagnostic"',
          'ServicePaper.patient_weight as "patient_weight"',
          'ServicePaper.patient_phone as "patient_phone"',
          'ServicePaper.patient_address as "patient_address"',
          'ServicePaper.patient_address_destiny as "patient_address_destiny"',
          'ServicePaper.arrive_hour as "arrive_hour"',
          'ServicePaper.observation as "observation"',
          'ServicePaper.contact_hour as "contact_hour"',
          'ServicePaper.finished_hour as "finished_hour"',
          'ServicePaper.name_support as "name_support"',
          'ServicePaper.equipment_used_support as "equipment_used_support"',
          'ServicePaper.cost_support as "cost_support"',
          'ServicePaper.deducible_support as "deducible_support"',
          'ServicePaper.units as "units"',
          'ServicePaper.operators as "operators"',
          'ServicePaper.unit as "unit"',
          'ServicePaper.operator as "operator"',
          'ServicePaper.id_paramedic as "id_paramedic"',
          'ServicePaper.paramedic as "paramedic"',
          'ServicePaper.departure_time as "departure_time"',
          'ServicePaper.on_site as "on_site"',
          'ServicePaper.with_frap as "with_frap"',
          'ServicePaper.start_transfer as "start_transfer"',
          'ServicePaper.with_recipe as "with_recipe"',
          'ServicePaper.on_hospital as "on_hospital"',
          'ServicePaper.with_report as "with_report"',
          'ServicePaper.email_serv_ambulance as "email_serv_ambulance"',
        ])
        // .leftJoin(Suppliers, 'supplier', 'supplier.deleted = :deletedSupplier AND supplier.id = ServicePaper.id_supplier', { deletedSupplier: 0 })
        // .leftJoin(Paramedics, 'paramedics', 'paramedics.deleted = :deletedParamedic AND paramedics.id = ServicePaper.id_paramedic', { deletedParamedic: 0 })
        // .leftJoin(Operators, 'operators', 'operators.deleted = :deletedOperator AND operators.id = ServicePaper.id_operator', { deletedOperator: 0 })
        // .leftJoin(Units, 'units', 'units.deleted = :deletedUnit AND units.id = ServicePaper.id_unit', { deletedUnit: 0 })
        .getRawOne();
      if (!servicioProgramado) {
        return 'error';
      }
      console.log(servicioProgramado)
      let medicalReport = await medicalReportRepository.findOneBy({ id_service_paper_medic_at_home: servicioProgramado.id })
      if (medicalReport) {
        // Hacer algo con el medicalReport
        return 'error'
      } else {
        return servicioProgramado;
      }
    } catch (error) {

      return error
    }
  }

  static async disableServicePaper(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await ServicePaperRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await ServicePaperRepository.update({ id: data.id }, { active: 0, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readServicePaper(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async enableServicePaper(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await ServicePaperRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await ServicePaperRepository.update({ id: data.id }, { active: 1, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readServicePaper(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async deleteServicePaper(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await ServicePaperRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      const ServicePaperUpdated = await ServicePaperRepository.update({ id: data.id }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      //Retornamos los datos actualizados
      return ServicePaperUpdated;
    } catch (error) {
      return error
    }
  }


}