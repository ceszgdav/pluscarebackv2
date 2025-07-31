import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { ServiceType } from '../../entity/CAT/ServiceTypes';
import { SatisfactionLetter } from '../../entity/SERV/SatisfactionLetter';
import fs from 'fs';
import path from 'path';

const SatisfactionRepository = AppDataSource.getRepository(SatisfactionLetter);

export class SatisfactionTransactions {

  static async createSatisfaction(data: any) {
    try {

      const currentSatisfaction = await this.proveSatisfaction(data);
      if (currentSatisfaction) {
        return await this.updateSatisfaction(data)
      } else {
        //Creamos el uuid para el Role
        let uuid = uuidv4();
        //Agregamos el uuid al nuevo registro
        let newData = { ...data, uuid }
        //Ingresamos los datos del nuevo servicioProgramado
        const servicioProgramado = await SatisfactionRepository.save(newData)
        const newSatisfaction = await this.readSatisfaction(servicioProgramado);
        //Retornamos el resultado del insertado de servicioProgramado
        return newSatisfaction
      }
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSignIncident(data) {
    try {
      const directoryPath = path.join(process.cwd(), `src/storage/serviceSigns/${data.id_incident}`);
      const satisfactionSignFilePath = path.join(directoryPath, 'satisfactionSign.png');
      // Verifica si el directorio existe
      if (!fs.existsSync(directoryPath)) {
        // Si el directorio no existe, créalo
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      if (data.sign) {
        data.sign = data.sign.replace(/^data:image\/png;base64,/, '');
        fs.writeFile(satisfactionSignFilePath, data.sign, { encoding: 'base64' }, function (err) {
          if (err) {
          } else {
          }
        });
        data.sign = 'satisfactionSign.png';
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  static async updateSatisfaction(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await SatisfactionRepository.findOneBy({ id_incident: data.id_incident });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await SatisfactionRepository.update({ id: servicioProgramado.id }, data);
      //Obtenemos el dato actualizado
      const SatisfactionUpdated = await this.readSatisfaction(data);
      //Retornamos los datos actualizados
      return SatisfactionUpdated;
    } catch (error) {
      return error
    }
  }

  static async readSatisfactions() {
    try {
      const servicioProgramado = await SatisfactionRepository.createQueryBuilder('Satisfaction')
        .where({
          deleted: 0,
          active: 1
        })
        .orderBy('Satisfaction.id', 'DESC')
        .select([
          'Satisfaction.id as "id"',
          'Satisfaction.uuid as "uuid"',
          'Satisfaction.folio as "folio"',
          'Satisfaction.date as date',
          'Satisfaction.received_call as "received_call"',
          'Satisfaction.place_occurrence as place_occurrence',
          'Satisfaction.active as active',
          'serviceType.name as "serviceType"'
        ])
        .leftJoin(ServiceType, 'serviceType', 'Satisfaction.place_occurrence = serviceType.id')
        .getRawMany();

      // Retornar todos los Satisfaction transformados
      return servicioProgramado;
    } catch (error) {
      return error;
    }
  }

  static async readSatisfaction(data: any) {
    try {
      //Buscamos un servicioProgramado por medio del id para obtener su información
      const servicioProgramado = await SatisfactionRepository.createQueryBuilder('Satisfaction')
        .where({
          deleted: 0,
          active: 1,
          uuid: data.uuid
        })
        .select([
          'Satisfaction.id as "id"',
          'Satisfaction.uuid as "uuid"',
          'Satisfaction.folio as "folio"',
          'Satisfaction.creation_event_place as "creation_event_place"',
          'Satisfaction.date as "date"',
          'Satisfaction.programmed as "programmed"',
          'Satisfaction.external as "external"',
          'Satisfaction.received_call as "received_call"',
          'Satisfaction.id_insurance as "id_insurance"',
          'Satisfaction.activation_call as "activation_call"',
          'Satisfaction.place_occurrence as "place_occurrence"',
          'Satisfaction.answer_call as "answer_call"',
          'Satisfaction.service_cost as "service_cost"',
          'Satisfaction.expedient as "expedient"',
          'Satisfaction.requester as "requester"',
          'Satisfaction.patient_name as "patient_name"',
          'Satisfaction.patient_year as "patient_year"',
          'Satisfaction.patient_diagnostic as "patient_diagnostic"',
          'Satisfaction.patient_weight as "patient_weight"',
          'Satisfaction.patient_phone as "patient_phone"',
          'Satisfaction.patient_address as "patient_address"',
          'Satisfaction.patient_address_destiny as "patient_address_destiny"',
          'Satisfaction.arrive_hour as "arrive_hour"',
          'Satisfaction.observation as "observation"',
          'Satisfaction.contact_hour as "contact_hour"',
          'Satisfaction.finished_hour as "finished_hour"',
          'Satisfaction.name_support as "name_support"',
          'Satisfaction.equipment_used_support as "equipment_used_support"',
          'Satisfaction.cost_support as "cost_support"',
          'Satisfaction.deducible_support as "deducible_support"',
          'Satisfaction.units as "units"',
          'Satisfaction.operators as "operators"',
          'Satisfaction.unit as "unit"',
          'Satisfaction.operator as "operator"',
          'Satisfaction.id_paramedic as "id_paramedic"',
          'Satisfaction.paramedic as "paramedic"',
          'Satisfaction.departure_time as "departure_time"',
          'Satisfaction.on_site as "on_site"',
          'Satisfaction.with_frap as "with_frap"',
          'Satisfaction.start_transfer as "start_transfer"',
          'Satisfaction.with_recipe as "with_recipe"',
          'Satisfaction.on_hospital as "on_hospital"',
          'Satisfaction.with_report as "with_report"',
          'Satisfaction.email_serv_ambulance as "email_serv_ambulance"',
        ])
        // .leftJoin(Suppliers, 'supplier', 'supplier.deleted = :deletedSupplier AND supplier.id = Satisfaction.id_supplier', { deletedSupplier: 0 })
        // .leftJoin(Paramedics, 'paramedics', 'paramedics.deleted = :deletedParamedic AND paramedics.id = Satisfaction.id_paramedic', { deletedParamedic: 0 })
        // .leftJoin(Operators, 'operators', 'operators.deleted = :deletedOperator AND operators.id = Satisfaction.id_operator', { deletedOperator: 0 })
        // .leftJoin(Units, 'units', 'units.deleted = :deletedUnit AND units.id = Satisfaction.id_unit', { deletedUnit: 0 })
        .getRawOne();
      //Retornamos el servicioProgramado
      return servicioProgramado;
    } catch (error) {

      return error
    }
  }

  static async proveSatisfaction(data: any) {
    try {
      //Buscamos un servicioProgramado por medio del id para obtener su información
      const servicioProgramado = await SatisfactionRepository.createQueryBuilder('Satisfaction')
        .where({
          deleted: 0,
          active: 1,
          id_incident: data.id_incident
        })
        .select([
          'Satisfaction.id as "id"',
          'Satisfaction.uuid as "uuid"',
        ])
        .getRawOne();
      //Retornamos el servicioProgramado
      return servicioProgramado;
    } catch (error) {

      return error
    }
  }

  static async disableSatisfaction(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await SatisfactionRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await SatisfactionRepository.update({ id: data.id }, { active: 0, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readSatisfaction(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async enableSatisfaction(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await SatisfactionRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      await SatisfactionRepository.update({ id: data.id }, { active: 1, updated_by: data.updated_by });
      //Obtenemos el dato actualizado
      const actualizado = await this.readSatisfaction(data);
      //Retornamos los datos actualizados
      return actualizado;
    } catch (error) {
      return error
    }
  }

  static async deleteSatisfaction(data: any) {
    try {
      //Buscamos el servicioProgramado por medio del id
      const servicioProgramado = await SatisfactionRepository.findOneBy({ id: data.id });
      //En caso de que no exista el servicioProgramado retornamos un error
      if (!servicioProgramado) {
        return 'error';
      }
      //Si existe el servicioProgramado procedemos a actualizarlo
      const SatisfactionUpdated = await SatisfactionRepository.update({ id: data.id }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      //Retornamos los datos actualizados
      return SatisfactionUpdated;
    } catch (error) {
      return error
    }
  }


}