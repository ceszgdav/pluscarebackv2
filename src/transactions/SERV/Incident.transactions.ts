import { AppDataSource } from '../../config/connection';
import { Incidents } from '../../entity/SERV/Incidents';
import { v4 as uuidv4 } from 'uuid';
import { ServiceType } from '../../entity/CAT/ServiceTypes';
import { MechanismScales } from '../../entity/SERV/MechanismScales';
import { Evaluations } from '../../entity/SERV/Evaluations';
import { VitalSigns } from '../../entity/SERV/VitalSigns';
import { LesionCoords } from '../../entity/SERV/LesionCoords';
import { LesionCoordsBurn } from '../../entity/SERV/LesionCoordsBurn';
import { LesionCoordsChild } from '../../entity/SERV/LesionCoordsChild';
import { Operators } from '../../entity/ADM/Operators';
import { Units } from '../../entity/ADM/Units';
import { OperatorsService } from '../../entity/SERV/Operator';
import fs from 'fs';
import path from 'path';
import { EventTypes } from '../../entity/SERV/EventTypes';
import { ClinicalCauses } from '../../entity/SERV/ClinicalCauses';
import { ConsciousnessState } from '../../entity/SERV/ConsciousnessState';
import { Airway } from '../../entity/SERV/Airway';
import { Circulation } from '../../entity/SERV/Circulation';
import { Skin } from '../../entity/SERV/Skin';
import { Characteristics } from '../../entity/SERV/Characteristics';
import { TeamSupport } from '../../entity/SERV/TeamSupport';
import { ServicePaper } from '../../entity/SERV/ServicePaper';

const directoryPath = path.join(process.cwd(), 'src/storage/serviceSigns');
const pdfPath = path.join(process.cwd(), 'src/html/');

// Verifica si el directorio existe
if (!fs.existsSync(directoryPath)) {
  // Si el directorio no existe, créalo
  fs.mkdirSync(directoryPath, { recursive: true });
}

const incidentsRepository = AppDataSource.getRepository(Incidents);
const mechanismScaleRepository = AppDataSource.getRepository(MechanismScales);
const evaluationRepository = AppDataSource.getRepository(Evaluations);
const vitalSignsRepository = AppDataSource.getRepository(VitalSigns);
const lesionCoordsRepository = AppDataSource.getRepository(LesionCoords);
const lesionCoordsBurnRepository = AppDataSource.getRepository(LesionCoordsBurn);
const lesionCoordsChildRepository = AppDataSource.getRepository(LesionCoordsChild);
const operatorsRepository = AppDataSource.getRepository(OperatorsService);
const eventTypesRepository = AppDataSource.getRepository(EventTypes);
const clinicalCausesRepository = AppDataSource.getRepository(ClinicalCauses);
const ConssiousStateRepository = AppDataSource.getRepository(ConsciousnessState);
const AirwayRepository = AppDataSource.getRepository(Airway);
const CirculationRepository = AppDataSource.getRepository(Circulation);
const SkinRepository = AppDataSource.getRepository(Skin);
const CharacteristicsRepository = AppDataSource.getRepository(Characteristics);
const teamSupportRepository = AppDataSource.getRepository(TeamSupport);
const ServicePaperRepository = AppDataSource.getRepository(ServicePaper)

export class IncidentsTransactions {

  static async createIncident(data: any) {
    try {
      if (data.unit === 0) {
        delete data.unit
        delete data.operator
        delete data.id_paramedic
      }
      //Ingresamos los datos del nuevo registro
      const nuewIncident = await incidentsRepository.save(data)
      const incident = await this.readCreatedIncident(nuewIncident)
      let id_incident = incident.id
      let uuid = uuidv4();
      let rpetData = { ...data, id_incident, uuid }
      await mechanismScaleRepository.save(rpetData)
      uuid = uuidv4();
      rpetData = { ...data, id_incident, uuid }
      await evaluationRepository.save(rpetData)
      uuid = uuidv4();
      rpetData = { ...data, id_incident, uuid }
      await vitalSignsRepository.save(rpetData)
      uuid = uuidv4();
      rpetData = { ...data, id_incident, uuid }
      await operatorsRepository.save(rpetData)
      rpetData = { ...data, id_incident, uuid }
      await teamSupportRepository.save(rpetData)
      //Se guarda en caso de que exista el lugar de ocurrencia
      if (data.place_occurrence) {
        let placeOccurrence = []
        data.place_occurrence.forEach((element: any, index: number) => {
          if (element) {
            placeOccurrence.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                eventType: index,
              }
            )
          }
        });
        await eventTypesRepository.save(placeOccurrence);
      }
      //En caso de que exista se guardan las causas clinicas
      if (data.clinicalCauses) {
        let clinicalCauses = []
        data.clinicalCauses.forEach((element: any, index: number) => {
          if (element) {
            clinicalCauses.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                clinicalCause: index,
              }
            )
          }
        });
        await clinicalCausesRepository.save(clinicalCauses);
      }
      //En caso de que exista se guardan los estados de conciencia
      if (data.consciousness_state) {
        let consciousness_state = []
        data.consciousness_state.forEach((element: any, index: number) => {
          if (element) {
            consciousness_state.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                consciousnessState: index,
              }
            )
          }
        });
        await ConssiousStateRepository.save(consciousness_state);
      }
      //En caso de que exista se guardan las vias aereas
      if (data.airway) {
        let airway = []
        data.airway.forEach((element: any, index: number) => {
          if (element) {
            airway.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                airway: index,
              }
            )
          }
        });
        await AirwayRepository.save(airway);
      }
      //En caso de que exista se guardan las circulaciones
      if (data.circulation) {
        let circulation = []
        data.circulation.forEach((element: any, index: number) => {
          if (element) {
            circulation.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                circulation: index,
              }
            )
          }
        });
        await CirculationRepository.save(circulation);
      }
      //En caso de que exista se guardan las piel
      if (data.skin) {
        let skin = []
        data.skin.forEach((element: any, index: number) => {
          if (element) {
            skin.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                skin: index,
              }
            )
          }
        });
        await SkinRepository.save(skin);
      }
      //En caso de que exista se guardan las caracteristicas
      if (data.characteristics) {
        let characteristics = []
        data.characteristics.forEach((element: any, index: number) => {
          if (element) {
            characteristics.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                characteristics: index,
              }
            )
          }
        });
        await CharacteristicsRepository.save(characteristics);
      }
      //En caso de que existan se guardan los estados de conciencia
      //Retornamos el resultado del insertado de registro
      return incident
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async updateSignIncident(data) {
    try {
      const directoryPath = path.join(process.cwd(), `src/storage/serviceSigns/${data.id_incident}`);

      const familySignFilePath = path.join(directoryPath, 'familySign.png');
      const medicSignFilePath = path.join(directoryPath, 'medicSign.png');
      const finalSignFilePath = path.join(directoryPath, 'finalSign.png');
      // Verifica si el directorio existe
      if (!fs.existsSync(directoryPath)) {
        // Si el directorio no existe, créalo
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      if (data.family_sign) {
        data.family_sign = data.family_sign.replace(/^data:image\/png;base64,/, '');
        fs.writeFile(familySignFilePath, data.family_sign, { encoding: 'base64' }, function (err) {
          if (err) {
          } else {
          }
        });
        data.family_sign = 'familySign.png';
      }
      if (data.medic_sign) {
        data.medic_sign = data.medic_sign.replace(/^data:image\/png;base64,/, '');

        fs.writeFile(medicSignFilePath, data.medic_sign, { encoding: 'base64' }, function (err) {
          if (err) {
          } else {
          }
        });
        data.medic_sign = 'medicSign.png';
      }
      if (data.final_sign) {
        data.final_sign = data.final_sign.replace(/^data:image\/png;base64,/, '');

        fs.writeFile(finalSignFilePath, data.final_sign, { encoding: 'base64' }, function (err) {
          if (err) {
          } else {
          }
        });
        data.final_sign = 'finalSign.png';
      }
      await vitalSignsRepository.update({ id_incident: data.id_incident }, data);
      const incident = await this.readCreatedIncident(data)
      return incident;
    } catch (error) {
      return error;
    }
  }

  static async storeCoordsIncident(data: any) {
    try {
      if (data.lesionCoords.length > 0) {
        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsRepository.save(dataStore)
        });
      }
      if (data.lesionCoordsBurn.length > 0) {
        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsBurnRepository.save(dataStore)
        });
      }
      if (data.lesionCoordsChild.length > 0) {
        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsChildRepository.save(dataStore)
        });
      }
      return 'ok'
    } catch (error) {
      return error;
    }
  }

  static async countIncidents() {
    try {
      //Buscamos y obtenemos todos los incident
      const incident = await incidentsRepository.findAndCount();
      //Retornamos todos los incident
      return incident[1];
    } catch (error) {
      return error
    }
  }

  static async readIncidents() {
    try {
      //Buscamos y obtenemos todos los incident
      const incident = await incidentsRepository.createQueryBuilder('incident')
        .where({
          deleted: 0
        })
        .orderBy('incident.id', 'DESC')
        .select([
          'incident.id as id',
          'incident.uuid as uuid',
          'incident.date as date',
          'incident.patient_name as patient_name',
          'incident.patient_state as patient_state',
          'incident.patient_city as patient_city',
          'incident.id_service_paper as id_service_paper',
          'serviceType.name as "event_type"'
        ])
        .leftJoin(ServiceType, 'serviceType', 'incident.event_type = serviceType.id')
        // // .leftJoin(Requesters, 'requester', 'requester.id_incident = incident.id')
        // // .leftJoin(Patient, 'patient', 'patient.id_incident = incident.id')
        // .leftJoin(Event, 'event', 'event.id_incident = incident.id')
        .getRawMany();
      //Retornamos todos los incident
      return incident;
    } catch (error) {
      return error
    }
  }

  static async readIncident(data: Incidents) {
    try {
      //Buscamos y obtenemos el incident
      const incident = await incidentsRepository.createQueryBuilder('incident')
        .where({
          uuid: data.uuid
        })
        .select([
          'incident.id as id',
          'incident.id_service_paper as id_service_paper',
          'incident.creation_event_place as creation_event_place',
          'incident.programmed as programmed',
          'incident.external as external',
          'incident.id_insurance as id_insurance',
          'incident.service_cost as service_cost',
          'incident.requester as requester',
          'incident.activation_call as activation_call',
          'incident.answer_call as answer_call',
          'incident.expedient as expedient',
          'incident.patient_diagnostic as patient_diagnostic',
          'incident.patient_address_destiny as patient_address_destiny',
          'incident.arrive_hour as arrive_hour',
          'incident.contact_hour as contact_hour',
          'incident.finished_hour as finished_hour',
          'incident.observation as observation',
          'incident.id_paramedic as id_paramedic',
          'incident.with_frap as with_frap',
          'incident.with_recipe as with_recipe',
          'incident.with_report as with_report',
          'incident.email_serv_ambulance as email_serv_ambulance',
          'incident.uuid as uuid',
          'incident.date as "date"',
          'incident.folio as "folio"',
          'incident.received_call as "received_call"',
          'incident.departure_time as "departure_time"',
          'incident.on_site as "on_site"',
          'incident.start_transfer as "start_transfer"',
          'incident.on_hospital as "on_hospital"',
          'incident.wait_Time as "wait_Time"',
          'incident.event_location as "event_location"',
          'incident.event_between_street_one as "event_between_street_one"',
          'incident.event_between_street_two as "event_between_street_two"',
          'incident.event_neighborhood as "event_neighborhood"',
          'incident.event_township as "event_township"',
          'incident.patient_name as "patient_name"',
          'incident.patient_year as "patient_year"',
          'incident.patient_zip_code as "patient_zip_code"',
          'incident.patient_city as "patient_city"',
          'incident.patient_state as "patient_state"',
          'incident.patient_phone as "patient_phone"',
          'incident.patient_address as "patient_address"',
          'incident.patient_occupation as "patient_occupation"',
          'incident.patient_on_charge as "patient_on_charge"',
          'incident.patient_company as "patient_company"',
          'incident.event_type as "event_type"',
          'incident.patient_gender as "patient_gender"',
          'incident.patient_beneficiary as "patient_beneficiary"',
          'incident.kilometer as "kilometer"',
          'incident.kms as "kms"',
          'incident.registrationaereosupport as "registrationaereosupport"',
          'incident.patient_weight as "patient_weight"',
          'incident.created_at as "created_at"',
          //Aqui va el tipo de evento
          'mechanismScales.crash_type as "crash_type"',
          'mechanismScales.crash_with as "crash_with"',
          'mechanismScales.crash_against_object as "crash_against_object"',
          'mechanismScales.windshield as "windshield"',
          'mechanismScales.in_car as "in_car"',
          'mechanismScales.seatbelt as "seatbelt"',
          'mechanismScales.aabm as "aabm"',
          'mechanismScales.fire_gun as "fire_gun"',
          'mechanismScales.white_gun as "white_gun"',
          'mechanismScales.ingestion_poisoning as "ingestion_poisoning"',
          'mechanismScales.inhaletion_poisoning as "inhaletion_poisoning"',
          'mechanismScales.explosion as "explosion"',
          'mechanismScales.animalHuman as "animalHuman"',
          'mechanismScales.fall as "fall"',
          'mechanismScales.own_size as "own_size"',
          'mechanismScales.approx_height as "approx_height"',
          'mechanismScales.electrical_burn as "electrical_burn"',
          'mechanismScales.acid_burn as "acid_burn"',
          'mechanismScales.leak_burn as "leak_burn"',
          'mechanismScales.hot_substance_burn as "hot_substance_burn"',
          'mechanismScales.vapor_gas_burn as "vapor_gas_burn"',
          'mechanismScales.biological_burn as "biological_burn"',
          'mechanismScales.scq_burn as "scq_burn"',
          //Aqui va causas clinicas
          'mechanismScales.others as "others"',
          'mechanismScales.init_date as "init_date"',
          'mechanismScales.symptoms as "symptoms"',
          'mechanismScales.signals as "signals"',
          'mechanismScales.G as "G"',
          'mechanismScales.P as "P"',
          'mechanismScales.A as "A"',
          'mechanismScales.C as "C"',
          'mechanismScales.FPP as "FPP"',
          'mechanismScales.FUR as "FUR"',
          'mechanismScales.gestation_week as "gestation_week"',
          'mechanismScales.membranes as "membranes"',
          'mechanismScales.contractions_init as "contractions_init"',
          'mechanismScales.frequency as "frequency"',
          'mechanismScales.duration_contractions as "duration_contractions"',
          'mechanismScales.contractions_regions as "contractions_regions"',
          'mechanismScales.newborn_data as "newborn_data"',
          'mechanismScales.newborn_apgar as "newborn_apgar"',
          'mechanismScales.postpartum_hours as "postpartum_hours"',
          'mechanismScales.postpartum_place as "postpartum_place"',
          'mechanismScales.postpartum_bearing as "postpartum_bearing"',
          'mechanismScales.heart_rate as "heart_rate"',
          'mechanismScales.breathing_effort as "breathing_effort"',
          'mechanismScales.irritability as "irritability"',
          'mechanismScales.muscle_tone as "muscle_tone"',
          'mechanismScales.coloration as "coloration"',
          'mechanismScales.newborn_gender as "newborn_gender"',
          'mechanismScales.init_hour as "init_hour"',
          'mechanismScales.applyMechanism as "applyMechanism"',
          'mechanismScales.applyAgent as "applyAgent"',
          'mechanismScales.applyBurn as "applyBurn"',
          'mechanismScales.applyOtherAntecedents as "applyOtherAntecedents"',
          'mechanismScales.applyAntecedents as "applyAntecedents"',
          'mechanismScales.applyBirth as "applyBirth"',
          'mechanismScales.applyPostpartum as "applyPostpartum"',
          'mechanismScales.applyApgar as "applyApgar"',
          //Aqui va evaluacion inicial
          'evaluations.init_evaluation_event as "init_evaluation_event"',
          'evaluations.consciousness_state_person as "consciousness_state_person"',
          'evaluations.consciousness_state_time as "consciousness_state_time"',
          'evaluations.consciousness_state_space as "consciousness_state_space"',
          'evaluations.pupillary_evaluation as "pupillary_evaluation"',
          'evaluations.occular_response as "occular_response"',
          'evaluations.verbal_response as "verbal_response"',
          'evaluations.motor_response as "motor_response"',
          'evaluations.glasgow_response as "glasgow_response"',
          'evaluations.facial_asymmetry as "facial_asymmetry"',
          'evaluations.facial_asymmetry_charge as "facial_asymmetry_charge"',
          'evaluations.lowering_arm as "lowering_arm"',
          'evaluations.lowering_arm_charge as "lowering_arm_charge"',
          'evaluations.lenguage_state as "lenguage_state"',
          'evaluations.cincinnatti_state as "cincinnatti_state"',
          'evaluations.rcp as "rcp"',
          'evaluations.airway_second_evaluation as "airway_second_evaluation"',
          'evaluations.medicaments as "medicaments"',
          'evaluations.shocks_j as "shocks_j"',
          'evaluations.qty as "qty"',
          'evaluations.init_evaluation_rate as "init_evaluation_rate"',
          'evaluations.applyEvaluation as "applyEvaluation"',
          'evaluations.applyPrimaryEvaluation as "applyPrimaryEvaluation"',
          'evaluations.applySecondaryEvaluation as "applySecondaryEvaluation"',
          //
          'vitalSigns.dx_indications as "dx_indications"',
          'vitalSigns.plan_iv as "plan_iv"',
          'vitalSigns.city_destiny as "city_destiny"',
          'vitalSigns.state_destiny as "state_destiny"',
          'vitalSigns.hospital_destiny as "hospital_destiny"',
          'vitalSigns.other_hospital_destiny as "other_hospital_destiny"',
          'vitalSigns.area_destiny as "area_destiny"',
          'vitalSigns.bed_destiny as "bed_destiny"',
          'vitalSigns.especiality_destiny as "especiality_destiny"',
          'vitalSigns.medic_destiny as "medic_destiny"',
          'vitalSigns.nourse_destiny as "nourse_destiny"',
          'vitalSigns.family_sign as "family_sign"',
          'vitalSigns.medic_sign as "medic_sign"',
          'vitalSigns.final_sign as "final_sign"',
          'vitalSigns.doctor_responsable_name as "doctor_responsable_name"',
          'vitalSigns.patient_responsable_name as "patient_responsable_name"',
          'vitalSigns.familiar_name as "familiar_name"',
          'vitalSigns.familiar_phone as "familiar_phone"',
          'vitalSigns.familiar_address as "familiar_address"',
          'vitalSigns.first_hour_vitals as "first_hour_vitals"',
          'vitalSigns.second_hour_vitals as "second_hour_vitals"',
          'vitalSigns.third_hour_vitals as "third_hour_vitals"',
          'vitalSigns.four_hour_vitals as "four_hour_vitals"',
          'vitalSigns.five_hour_vitals as "five_hour_vitals"',
          'vitalSigns.first_breathing_frequency_vitals as "first_breathing_frequency_vitals"',
          'vitalSigns.second_breathing_frequency_vitals as "second_breathing_frequency_vitals"',
          'vitalSigns.third_breathing_frequency_vitals as "third_breathing_frequency_vitals"',
          'vitalSigns.four_breathing_frequency_vitals as "four_breathing_frequency_vitals"',
          'vitalSigns.five_breathing_frequency_vitals as "five_breathing_frequency_vitals"',
          'vitalSigns.first_heart_rate_vitals as "first_heart_rate_vitals"',
          'vitalSigns.second_heart_rate_vitals as "second_heart_rate_vitals"',
          'vitalSigns.third_heart_rate_vitals as "third_heart_rate_vitals"',
          'vitalSigns.four_heart_rate_vitals as "four_heart_rate_vitals"',
          'vitalSigns.five_heart_rate_vitals as "five_heart_rate_vitals"',
          'vitalSigns.first_o_saturations_vitals as "first_o_saturations_vitals"',
          'vitalSigns.second_o_saturations_vitals as "second_o_saturations_vitals"',
          'vitalSigns.third_o_saturations_vitals as "third_o_saturations_vitals"',
          'vitalSigns.four_o_saturations_vitals as "four_o_saturations_vitals"',
          'vitalSigns.five_o_saturations_vitals as "five_o_saturations_vitals"',
          'vitalSigns.first_one_arterial_tension_vitals as "first_one_arterial_tension_vitals"',
          'vitalSigns.first_two_arterial_tension_vitals as "first_two_arterial_tension_vitals"',
          'vitalSigns.second_one_arterial_tension_vitals as "second_one_arterial_tension_vitals"',
          'vitalSigns.second_two_arterial_tension_vitals as "second_two_arterial_tension_vitals"',
          'vitalSigns.third_one_arterial_tension_vitals as "third_one_arterial_tension_vitals"',
          'vitalSigns.third_two_arterial_tension_vitals as "third_two_arterial_tension_vitals"',
          'vitalSigns.four_one_arterial_tension_vitals as "four_one_arterial_tension_vitals"',
          'vitalSigns.four_two_arterial_tension_vitals as "four_two_arterial_tension_vitals"',
          'vitalSigns.five_one_arterial_tension_vitals as "five_one_arterial_tension_vitals"',
          'vitalSigns.five_two_arterial_tension_vitals as "five_two_arterial_tension_vitals"',
          'vitalSigns.first_temperature_vitals as "first_temperature_vitals"',
          'vitalSigns.second_temperature_vitals as "second_temperature_vitals"',
          'vitalSigns.third_temperature_vitals as "third_temperature_vitals"',
          'vitalSigns.four_temperature_vitals as "four_temperature_vitals"',
          'vitalSigns.five_temperature_vitals as "five_temperature_vitals"',
          'vitalSigns.first_glucose_vitals as "first_glucose_vitals"',
          'vitalSigns.second_glucose_vitals as "second_glucose_vitals"',
          'vitalSigns.third_glucose_vitals as "third_glucose_vitals"',
          'vitalSigns.four_glucose_vitals as "four_glucose_vitals"',
          'vitalSigns.five_glucose_vitals as "five_glucose_vitals"',
          'vitalSigns.first_first_diuresis_vitals as "first_first_diuresis_vitals"',
          'vitalSigns.second_second_diuresis_vitals as "second_second_diuresis_vitals"',
          'vitalSigns.third_third_diuresis_vitals as "third_third_diuresis_vitals"',
          'vitalSigns.four_four_diuresis_vitals as "four_four_diuresis_vitals"',
          'vitalSigns.five_five_diuresis_vitals as "five_five_diuresis_vitals"',
          'vitalSigns.responsible_nurse as "responsible_nurse"',
          'vitalSigns.medicine_first as "medicine_first"',
          'vitalSigns.medicine_second as "medicine_second"',
          'vitalSigns.medicine_third as "medicine_third"',
          'vitalSigns.medicine_four as "medicine_four"',
          'vitalSigns.medicine_five as "medicine_five"',
          'vitalSigns.medicine_six as "medicine_six"',
          'vitalSigns.medicine_seven as "medicine_seven"',
          'vitalSigns.hour_first as "hour_first"',
          'vitalSigns.hour_second as "hour_second"',
          'vitalSigns.hour_third as "hour_third"',
          'vitalSigns.hour_four as "hour_four"',
          'vitalSigns.hour_five as "hour_five"',
          'vitalSigns.hour_six as "hour_six"',
          'vitalSigns.hour_seven as "hour_seven"',
          'vitalSigns.dosis_first as "dosis_first"',
          'vitalSigns.dosis_second as "dosis_second"',
          'vitalSigns.dosis_third as "dosis_third"',
          'vitalSigns.dosis_four as "dosis_four"',
          'vitalSigns.dosis_five as "dosis_five"',
          'vitalSigns.dosis_six as "dosis_six"',
          'vitalSigns.dosis_seven as "dosis_seven"',
          'vitalSigns.via_first as "via_first"',
          'vitalSigns.via_second as "via_second"',
          'vitalSigns.via_third as "via_third"',
          'vitalSigns.via_four as "via_four"',
          'vitalSigns.via_five as "via_five"',
          'vitalSigns.via_six as "via_six"',
          'vitalSigns.via_seven as "via_seven"',
          'vitalSigns.other as "other"',
          'vitalSigns.authorize as "authorize"',
          'vitalSigns.applyVitalSigns as "applyVitalSigns"',
          'vitalSigns.applyDrugs as "applyDrugs"',
          'vitalSigns.applyPlan as "applyPlan"',
          'vitalSigns.applyDestiny as "applyDestiny"',
          'opservice.tum as "tum"',
          'opservice.dr as "dr"',
          'opservice.operator as "operator"',
          'opservice.unit as "unit"',
          'opservice.operators as "operators"',
          'opservice.units as "units"',
          'operators.name as "operator_name"',
          'units.unit_name as "unit_name"',
          //Aqui va el soporte de proveedor
          'ts.name_support as "name_support"',
          'ts.equipment_used_support as "equipment_used_support"',
          'ts.cost_support as "cost_support"',
          'ts.deducible_support as "deducible_support"',
        ])
        .leftJoin(MechanismScales, 'mechanismScales', 'mechanismScales.id_incident = incident.id')
        .leftJoin(Evaluations, 'evaluations', 'evaluations.id_incident = incident.id')
        .leftJoin(VitalSigns, 'vitalSigns', 'vitalSigns.id_incident = incident.id')
        .leftJoin(OperatorsService, 'opservice', 'opservice.id_incident = incident.id')
        .leftJoin(Operators, 'operators', 'operators.id = opservice.operator')
        .leftJoin(Units, 'units', 'units.id = opservice.unit')
        .leftJoin(TeamSupport, 'ts', 'ts.id_incident = incident.id')
        .getRawOne();


      const directoryPath = path.join(process.cwd(), `src/storage/serviceSigns/${incident.id}`);

      const familySignFilePath = path.join(directoryPath, 'familySign.png');
      const medicSignFilePath = path.join(directoryPath, 'medicSign.png');
      const finalSignFilePath = path.join(directoryPath, 'finalSign.png');
      let base64Image
      let dataUrl


      if (incident.family_sign) {
        await fs.readFile(familySignFilePath, (err, data) => {
          if (err) {
            return;
          }

          // Convertir el buffer de la imagen a una cadena base64
          base64Image = data.toString('base64');

          // Crear un data URL con la cadena base64
          dataUrl = `data:image/png;base64,${base64Image}`;
          incident.family_sign = dataUrl
        });
      }

      if (incident.medic_sign) {
        await fs.readFile(medicSignFilePath, (err, data) => {
          if (err) {
            return;
          }

          // Convertir el buffer de la imagen a una cadena base64
          base64Image = data.toString('base64');

          // Crear un data URL con la cadena base64
          dataUrl = `data:image/png;base64,${base64Image}`;
          incident.medic_sign = dataUrl
        });
      }
      if (incident.final_sign) {
        await fs.readFile(finalSignFilePath, (err, data) => {
          if (err) {
            return;
          }

          // Convertir el buffer de la imagen a una cadena base64
          base64Image = data.toString('base64');

          // Crear un data URL con la cadena base64
          dataUrl = `data:image/png;base64,${base64Image}`;
          incident.final_sign = dataUrl
        });
      }

      const incidentLessionCoords = await lesionCoordsRepository.createQueryBuilder('lesionCoords')
        .where({
          id_incident: incident.id
        })
        .select([
          'lesionCoords.xCoord as x',
          'lesionCoords.yCoord as y',
        ])
        .getRawMany();

      const incidentLessionBurnCoords = await lesionCoordsBurnRepository.createQueryBuilder('lesionCoordsBurn')
        .where({
          id_incident: incident.id
        })
        .select([
          'lesionCoordsBurn.xCoord as x',
          'lesionCoordsBurn.yCoord as y',
        ])
        .getRawMany();

      const incidentLessionChildCoords = await lesionCoordsChildRepository.createQueryBuilder('lesionCoordsChild')
        .where({
          id_incident: incident.id
        })
        .select([
          'lesionCoordsChild.xCoord as x',
          'lesionCoordsChild.yCoord as y',
        ])
        .getRawMany();

      incident.coordenadasClic = incidentLessionCoords;
      incident.cuerpoAdultoClic = incidentLessionBurnCoords;
      incident.cuerpoNinoClic = incidentLessionChildCoords;

      let place_occurrence = await eventTypesRepository.createQueryBuilder('et')
        .where({
          id_incident: incident.id
        })
        .select([
          'et.eventType as "eventType"',
        ])
        .getRawMany();

      place_occurrence = place_occurrence.map(item => item.eventType);

      let clinicalCauses = await clinicalCausesRepository.createQueryBuilder('cc')
        .where({
          id_incident: incident.id
        })
        .select([
          'cc.clinicalCause as "clinicalCause"',
        ])
        .getRawMany();
      clinicalCauses = clinicalCauses.map(item => item.clinicalCause);

      let consciousness_state = await ConssiousStateRepository.createQueryBuilder('cs')
        .where({
          id_incident: incident.id
        })
        .select([
          'cs.consciousnessState as "consciousnessState"',
        ])
        .getRawMany();
      consciousness_state = consciousness_state.map(item => item.consciousnessState);

      let airway = await AirwayRepository.createQueryBuilder('aw')
        .where({
          id_incident: incident.id
        })
        .select([
          'aw.airway as "airway"',
        ])
        .getRawMany();
      airway = airway.map(item => item.airway);

      let circulation = await CirculationRepository.createQueryBuilder('c')
        .where({
          id_incident: incident.id
        })
        .select([
          'c.circulation as "circulation"',
        ])
        .getRawMany();
      circulation = circulation.map(item => item.circulation);

      let skin = await SkinRepository.createQueryBuilder('s')
        .where({
          id_incident: incident.id
        })
        .select([
          's.skin as "skin"',
        ])
        .getRawMany();
      skin = skin.map(item => item.skin);

      let characteristics = await CharacteristicsRepository.createQueryBuilder('ch')
        .where({
          id_incident: incident.id
        })
        .select([
          'ch.characteristics as "characteristics"',
        ])
        .getRawMany();
      characteristics = characteristics.map(item => item.characteristics);

      let servicePaper = await ServicePaperRepository.createQueryBuilder('sp')
        .where({
          id: incident.id_service_paper
        })
        .getRawOne();

      incident.place_occurrence = place_occurrence;
      incident.clinicalCauses = clinicalCauses;
      incident.consciousness_state = consciousness_state;
      incident.airway = airway;
      incident.circulation = circulation;
      incident.skin = skin;
      incident.characteristics = characteristics;
      incident.servicePaper = servicePaper

      //Retornamos el incident encontrado
      return incident;
    } catch (error) {
      return error
    }
  }

  static async readCreatedIncident(data: Incidents) {
    try {
      //Buscamos y obtenemos el incident
      const incident = await incidentsRepository.createQueryBuilder('incident')
        .where({
          uuid: data.uuid
        })
        .select([
          'incident.id as id',
          'incident.uuid as uuid',
        ])
        .getRawOne();
      //Retornamos el incident encontrado
      return incident;
    } catch (error) {
      return error
    }
  }

  static async updateIncident(data: any) {
    try {
      let incidentData = {
        departure_time: data.departure_time,
        on_site: data.on_site,
        start_transfer: data.start_transfer,
        on_hospital: data.on_hospital,
        wait_Time: data.wait_Time,
        event_type: data.event_type,
        kms: data.kms,
        registrationaereosupport: data.registrationaereosupport,
        kilometer: data.kilometer,
        event_location: data.event_location,
        event_between_street_one: data.event_between_street_one,
        event_between_street_two: data.event_between_street_two,
        event_neighborhood: data.event_neighborhood,
        event_township: data.event_township,
        patient_name: data.patient_name,
        patient_year: data.patient_year,
        patient_weight: data.patient_weight,
        patient_gender: data.patient_gender,
        patient_zip_code: data.patient_zip_code,
        patient_city: data.patient_city,
        patient_state: data.patient_state,
        patient_phone: data.patient_phone,
        patient_address: data.patient_address,
        patient_occupation: data.patient_occupation,
        patient_on_charge: data.patient_on_charge,
        patient_company: data.patient_company,
        patient_beneficiary: data.patient_beneficiary,
        initialized: data.initialized
      }
      const incidentUpdated = await incidentsRepository.update({ uuid: data.uuid }, incidentData);
      const incident = await this.readIncident(data)
      const id_incident = incident.id
      let newMechanismData = {
        crash_type: data.crash_type,
        crash_with: data.crash_with,
        crash_against_object: data.crash_against_object,
        windshield: data.windshield,
        in_car: data.in_car,
        seatbelt: data.seatbelt,
        aabm: data.aabm,
        fire_gun: data.fire_gun,
        white_gun: data.white_gun,
        ingestion_poisoning: data.ingestion_poisoning,
        inhaletion_poisoning: data.inhaletion_poisoning,
        explosion: data.explosion,
        animalHuman: data.animalHuman,
        fall: data.fall,
        own_size: data.own_size,
        approx_height: data.approx_height,
        electrical_burn: data.electrical_burn,
        acid_burn: data.acid_burn,
        leak_burn: data.leak_burn,
        hot_substance_burn: data.hot_substance_burn,
        vapor_gas_burn: data.vapor_gas_burn,
        biological_burn: data.biological_burn,
        scq_burn: data.scq_burn,
        others: data.others,
        init_date: data.init_date,
        init_hour: data.init_hour,
        symptoms: data.symptoms,
        signals: data.signals,
        G: data.G,
        P: data.P,
        A: data.A,
        C: data.C,
        FPP: data.FPP,
        FUR: data.FUR,
        gestation_week: data.gestation_week,
        membranes: data.membranes,
        contractions_init: data.contractions_init,
        frequency: data.frequency,
        duration_contractions: data.duration_contractions,
        contractions_regions: data.contractions_regions,
        newborn_data: data.newborn_data,
        newborn_gender: data.newborn_gender,
        newborn_apgar: data.newborn_apgar,
        postpartum_hours: data.postpartum_hours,
        postpartum_place: data.postpartum_place,
        postpartum_bearing: data.postpartum_bearing,
        heart_rate: data.heart_rate,
        breathing_effort: data.breathing_effort,
        irritability: data.irritability,
        muscle_tone: data.muscle_tone,
        coloration: data.coloration,
      }
      await mechanismScaleRepository.update({ id_incident: id_incident }, newMechanismData)
      let newEvaluationData = {
        init_evaluation_event: data.init_evaluation_event,
        init_evaluation_rate: data.init_evaluation_rate,
        consciousness_state_person: data.consciousness_state_person,
        consciousness_state_time: data.consciousness_state_time,
        consciousness_state_space: data.consciousness_state_space,
        pupillary_evaluation: data.pupillary_evaluation,
        occular_response: data.occular_response,
        verbal_response: data.verbal_response,
        motor_response: data.motor_response,
        glasgow_response: data.glasgow_response,
        facial_asymmetry: data.facial_asymmetry,
        facial_asymmetry_charge: data.facial_asymmetry_charge,
        lowering_arm: data.lowering_arm,
        lowering_arm_charge: data.lowering_arm_charge,
        lenguage_state: data.lenguage_state,
        cincinnatti_state: data.cincinnatti_state,
        rcp: data.rcp,
        airway_second_evaluation: data.airway_second_evaluation,
        medicaments: data.medicaments,
        shocks_j: data.shocks_j,
        qty: data.qty,
      }
      await evaluationRepository.update({ id_incident: id_incident }, newEvaluationData)
      let newSignsData = {
        first_hour_vitals: data.first_hour_vitals,
        second_hour_vitals: data.second_hour_vitals,
        third_hour_vitals: data.third_hour_vitals,
        four_hour_vitals: data.four_hour_vitals,
        five_hour_vitals: data.five_hour_vitals,
        first_breathing_frequency_vitals: data.first_breathing_frequency_vitals,
        second_breathing_frequency_vitals: data.second_breathing_frequency_vitals,
        third_breathing_frequency_vitals: data.third_breathing_frequency_vitals,
        four_breathing_frequency_vitals: data.four_breathing_frequency_vitals,
        five_breathing_frequency_vitals: data.five_breathing_frequency_vitals,
        first_heart_rate_vitals: data.first_heart_rate_vitals,
        second_heart_rate_vitals: data.second_heart_rate_vitals,
        third_heart_rate_vitals: data.third_heart_rate_vitals,
        four_heart_rate_vitals: data.four_heart_rate_vitals,
        five_heart_rate_vitals: data.five_heart_rate_vitals,
        first_o_saturations_vitals: data.first_o_saturations_vitals,
        second_o_saturations_vitals: data.second_o_saturations_vitals,
        third_o_saturations_vitals: data.third_o_saturations_vitals,
        four_o_saturations_vitals: data.four_o_saturations_vitals,
        five_o_saturations_vitals: data.five_o_saturations_vitals,
        first_one_arterial_tension_vitals: data.first_one_arterial_tension_vitals,
        first_two_arterial_tension_vitals: data.first_two_arterial_tension_vitals,
        second_one_arterial_tension_vitals: data.second_one_arterial_tension_vitals,
        second_two_arterial_tension_vitals: data.second_two_arterial_tension_vitals,
        third_one_arterial_tension_vitals: data.third_one_arterial_tension_vitals,
        third_two_arterial_tension_vitals: data.third_two_arterial_tension_vitals,
        four_one_arterial_tension_vitals: data.four_one_arterial_tension_vitals,
        four_two_arterial_tension_vitals: data.four_two_arterial_tension_vitals,
        five_one_arterial_tension_vitals: data.five_one_arterial_tension_vitals,
        five_two_arterial_tension_vitals: data.five_two_arterial_tension_vitals,
        first_temperature_vitals: data.first_temperature_vitals,
        second_temperature_vitals: data.second_temperature_vitals,
        third_temperature_vitals: data.third_temperature_vitals,
        four_temperature_vitals: data.four_temperature_vitals,
        five_temperature_vitals: data.five_temperature_vitals,
        first_glucose_vitals: data.first_glucose_vitals,
        second_glucose_vitals: data.second_glucose_vitals,
        third_glucose_vitals: data.third_glucose_vitals,
        four_glucose_vitals: data.four_glucose_vitals,
        five_glucose_vitals: data.five_glucose_vitals,
        first_first_diuresis_vitals: data.first_first_diuresis_vitals,
        second_second_diuresis_vitals: data.second_second_diuresis_vitals,
        third_third_diuresis_vitals: data.third_third_diuresis_vitals,
        four_four_diuresis_vitals: data.four_four_diuresis_vitals,
        five_five_diuresis_vitals: data.five_five_diuresis_vitals,
        responsible_nurse: data.responsible_nurse,
        dx_indications: data.dx_indications,
        medicine_first: data.medicine_first,
        medicine_second: data.medicine_second,
        medicine_third: data.medicine_third,
        medicine_four: data.medicine_four,
        medicine_five: data.medicine_five,
        medicine_six: data.medicine_six,
        medicine_seven: data.medicine_seven,
        hour_first: data.hour_first,
        hour_second: data.hour_second,
        hour_third: data.hour_third,
        hour_four: data.hour_four,
        hour_five: data.hour_five,
        hour_six: data.hour_six,
        hour_seven: data.hour_seven,
        dosis_first: data.dosis_first,
        dosis_second: data.dosis_second,
        dosis_third: data.dosis_third,
        dosis_four: data.dosis_four,
        dosis_five: data.dosis_five,
        dosis_six: data.dosis_six,
        dosis_seven: data.dosis_seven,
        via_first: data.via_first,
        via_second: data.via_second,
        via_third: data.via_third,
        via_four: data.via_four,
        via_five: data.via_five,
        via_six: data.via_six,
        via_seven: data.via_seven,
        other: data.other,
        plan_iv: data.plan_iv,
        city_destiny: data.city_destiny,
        state_destiny: data.state_destiny,
        hospital_destiny: data.hospital_destiny,
        other_hospital_destiny: data.other_hospital_destiny,
        area_destiny: data.area_destiny,
        bed_destiny: data.bed_destiny,
        especiality_destiny: data.especiality_destiny,
        medic_destiny: data.medic_destiny,
        nourse_destiny: data.nourse_destiny,
        familiar_name: data.familiar_name,
        familiar_phone: data.familiar_phone,
        familiar_address: data.familiar_address,
      }
      await vitalSignsRepository.update({ id_incident: id_incident }, newSignsData)
      let newOperatorsData = {
        operator: data.operator,
        unit: data.unit,
        tum: data.tum,
        dr: data.dr,
      }
      await operatorsRepository.update({ id_incident: id_incident }, newOperatorsData)

      //Se guarda en caso de que exista el lugar de ocurrencia
      if (data.place_occurrence) {
        await eventTypesRepository.delete({ id_incident: id_incident })
        let placeOccurrence = []
        data.place_occurrence.forEach((element: any, index: number) => {
          if (element) {
            placeOccurrence.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                eventType: index,
              }
            )
          }
        });
        await eventTypesRepository.save(placeOccurrence);
      }
      //En caso de que exista se guardan las causas clinicas
      if (data.clinicalCauses) {
        await clinicalCausesRepository.delete({ id_incident: id_incident })
        let clinicalCauses = []
        data.clinicalCauses.forEach((element: any, index: number) => {
          if (element) {
            clinicalCauses.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                clinicalCause: index,
              }
            )
          }
        });
        await clinicalCausesRepository.save(clinicalCauses);
      }
      //En caso de que exista se guardan los estados de conciencia
      if (data.consciousness_state) {
        await ConssiousStateRepository.delete({ id_incident: id_incident })
        let consciousness_state = []
        data.consciousness_state.forEach((element: any, index: number) => {
          if (element) {
            consciousness_state.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                consciousnessState: index,
              }
            )
          }
        });
        await ConssiousStateRepository.save(consciousness_state);
      }
      //En caso de que exista se guardan las vias aereas
      if (data.airway) {
        await AirwayRepository.delete({ id_incident: id_incident })
        let airway = []
        data.airway.forEach((element: any, index: number) => {
          if (element) {
            airway.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                airway: index,
              }
            )
          }
        });
        await AirwayRepository.save(airway);
      }
      //En caso de que exista se guardan las circulaciones
      if (data.circulation) {
        await CirculationRepository.delete({ id_incident: id_incident })
        let circulation = []
        data.circulation.forEach((element: any, index: number) => {
          if (element) {
            circulation.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                circulation: index,
              }
            )
          }
        });
        await CirculationRepository.save(circulation);
      }
      //En caso de que exista se guardan las piel
      if (data.skin) {
        await SkinRepository.delete({ id_incident: id_incident })
        let skin = []
        data.skin.forEach((element: any, index: number) => {
          if (element) {
            skin.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                skin: index,
              }
            )
          }
        });
        await SkinRepository.save(skin);
      }
      //En caso de que exista se guardan las caracteristicas
      if (data.characteristics) {
        await CharacteristicsRepository.delete({ id_incident: id_incident })
        let characteristics = []
        data.characteristics.forEach((element: any, index: number) => {
          if (element) {
            characteristics.push(
              {
                id_incident: id_incident,
                uuid: uuidv4(),
                characteristics: index,
              }
            )
          }
        });
        await CharacteristicsRepository.save(characteristics);
      }

      return incident;
    } catch (error) {
      return error;
    }
  }

  static async updateIncidentStatus(data: any) {
    try {
      //Si existe el servicioProgramado procedemos a actualizarlo
      return await incidentsRepository.update({ uuid: data.uuid }, data);
    } catch (error) {
      return error
    }
  }

  static async updateCoordsIncident(data: any) {
    try {
      if (data.lesionCoords.length > 0) {
        await lesionCoordsRepository.delete({ id_incident: data.id_incident })

        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsRepository.save(dataStore)
        });
      }
      if (data.lesionCoordsBurn.length > 0) {
        await lesionCoordsBurnRepository.delete({ id_incident: data.id_incident })

        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsBurnRepository.save(dataStore)
        });
      }
      if (data.lesionCoordsChild.length > 0) {
        await lesionCoordsChildRepository.delete({ id_incident: data.id_incident })
        data.lesionCoords.forEach(async (element) => {
          let dataStore = {
            uuid: uuidv4(),
            id_incident: data.id_incident,
            xCoord: element.x,
            yCoord: element.y,
          }
          await lesionCoordsChildRepository.save(dataStore)
        });
      }
      return 'ok'
    } catch (error) {
      return error;
    }
  }

  static async deleteIncident(data: Incidents) {
    try {
      await incidentsRepository.update({ uuid: data.uuid }, data);
      const incident = await this.readIncident(data)
      return incident;
    } catch (error) {
      return error;
    }
  }

}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0 indexados
  const year = date.getFullYear();

  return `${day}${month}${year}`;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}