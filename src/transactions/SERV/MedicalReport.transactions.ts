import { AppDataSource } from '../../config/connection';
import { MedicalReport } from '../../entity/SERV/MedicalReport';
import { MedicalReportPrescription } from '../../entity/SERV/MedicalReportPrescription';
import { MedicalReportPrescriptionItems } from '../../entity/SERV/MedicalReportPrescriptionItems';
import { MedicalReportTreatment } from '../../entity/SERV/MedicalReportTreatment';
import { v4 as uuidv4 } from 'uuid';

const medicalReportRepository = AppDataSource.getRepository(MedicalReport);
const medicalReportTreatmentRepository = AppDataSource.getRepository(MedicalReportTreatment);
const medicalReportPrescriptionRepository = AppDataSource.getRepository(MedicalReportPrescription);
const medicalReportPrescriptionItemsRepository = AppDataSource.getRepository(MedicalReportPrescriptionItems);

export class MedicalReportTransactions {

  static async createMedicalReport(data: any) {
    try {
      //Creamos el uuid para el Role
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      //Ingresamos los datos del nuevo registro
      const nuewIncident = await medicalReportRepository.save(newData)
      // Agregar el id_medical_report a cada objeto
      const bulkData = data.treatments.map(treatment => ({
        ...treatment,
        uuid: uuidv4(),
        id_medical_report: nuewIncident.id
      }));

      // Inserción en bulk con TypeORM
      await medicalReportTreatmentRepository.insert(bulkData);

      // Agregar el id_medical_report a cada objeto
      const prescription = {
        uuid: uuidv4(),
        id_medical_report: nuewIncident.id,
        prescriptionPatient: data.prescriptionPatient,
        prescriptionDate: data.prescriptionDate,
        prescriptionDoctorName: data.prescriptionDoctorName,
        prescriptionDoctorId: data.prescriptionDoctorId,
        prescriptionDoctorSpecialtyId: data.prescriptionDoctorSpecialtyId,
        prescriptionNumberCouncil: data.prescriptionNumberCouncil,
      };
      //Ingresamos los datos del nuevo registro
      const newPrescription = await medicalReportPrescriptionRepository.save(prescription)

      // Agregar el id_medical_report a cada objeto
      const prescriptionItems = data.prescriptions.map(prescription => ({
        ...prescription,
        uuid: uuidv4(),
        id_prescription: newPrescription.id
      }));
      // Inserción en bulk con TypeORM
      await medicalReportPrescriptionItemsRepository.insert(prescriptionItems);

      //Retornamos el resultado del insertado de registro
      return nuewIncident
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readMedicalReports() {
    try {
      //Buscamos y obtenemos todos los doctors
      const doctors = await medicalReportRepository.createQueryBuilder('medicalReport')
        .where({
          deleted: 0
        })
        .select([
          'medicalReport.id as id',
          'medicalReport.uuid as uuid',
          'medicalReport.expedient as expedient',
          'medicalReport.date as date',
          'medicalReport.checkIn as "checkIn"',
          'medicalReport.checkOut as "checkOut"',
          'medicalReport.active as "active"',

        ])
        .leftJoin(MedicalReportTreatment, 'medicalTreatment', 'medicalReport.id = medicalTreatment.id_medical_report')
        .getRawMany();
      //Retornamos todos los doctors
      return doctors;
    } catch (error) {
      return error
    }
  }

  // static async readMedicalReport(data) {
  //   try {
  //     //Buscamos y obtenemos todos los doctors
  //     const doctors = await medicalReportRepository.createQueryBuilder('medicalReport')
  //       .where({
  //         uuid: data.uuid
  //       })
  //       .select([
  //         'medicalReport.id as "id"',
  //         'medicalReport.uuid as "uuid"',
  //         'medicalReport.expedient as "expedient"',
  //         'medicalReport.date as "date"',
  //         'medicalReport.checkIn as "checkIn"',
  //         'medicalReport.checkOut as "checkOut"',
  //         'medicalReport.company as "company"',
  //         'medicalReport.address as "address"',
  //         'medicalReport.phone as "phone"',
  //         'medicalReport.patientName as "patientName"',
  //         'medicalReport.patientAge as "patientAge"',
  //         'medicalReport.patientGender as "patientGender"',
  //         'medicalReport.allergies as "allergies"',
  //         'medicalReport.transfusions as "transfusions"',
  //         'medicalReport.surgical as "surgical"',
  //         'medicalReport.immunizations as "immunizations"',
  //         'medicalReport.chronicDegenerative as "chronicDegenerative"',
  //         'medicalReport.traumas as "traumas"',
  //         'medicalReport.patientHeight as "patientHeight"',
  //         'medicalReport.patientTemperature as "patientTemperature"',
  //         'medicalReport.patientCardiacFrequency as "patientCardiacFrequency"',
  //         'medicalReport.patientWeight as "patientWeight"',
  //         'medicalReport.bloodPressure as "bloodPressure"',
  //         'medicalReport.respiratoryRate as "respiratoryRate"',
  //         'medicalReport.oxygen as "oxygen"',
  //         'medicalReport.glucose as "glucose"',
  //         'medicalReport.currentCondition as "currentCondition"',
  //         'medicalReport.headNeck as "headNeck"',
  //         'medicalReport.cardioPulmonary as "cardioPulmonary"',
  //         'medicalReport.abdomen as "abdomen"',
  //         'medicalReport.limbs as "limbs"',
  //         'medicalReport.neurological as "neurological"',
  //         'medicalReport.others as "others"',
  //         'medicalReport.diagnostic as "diagnostic"',
  //         'medicalReport.procedures as "procedures"',
  //         'medicalReport.antibiotics as "antibiotics"',
  //         'medicalReport.labTests as "labTests"',
  //         'medicalReport.gabinetTests as "gabinetTests"',
  //         'medicalReport.hospitalReference as "hospitalReference"',
  //         'medicalReport.ambulanceRide as "ambulanceRide"',
  //         'medicalReport.medicAtTime as "medicAtTime"',
  //         'medicalReport.medicRespectful as "medicRespectful"',
  //         'medicalReport.medicClear as "medicClear"',
  //       ])
  //       .leftJoin(MedicalReportTreatment, 'medicalTreatment', 'medicalReport.id = medicalTreatment.id_medical_report')
  //       .getRawMany();
  //     //Retornamos todos los doctors
  //     return doctors;
  //   } catch (error) {
  //     return error
  //   }
  // }
  static async readMedicalReport(data) {
    try {
      const doctors = await medicalReportRepository.createQueryBuilder('medicalReport')
        .leftJoin(MedicalReportTreatment, 'medicalTreatment', 'medicalReport.id = medicalTreatment.id_medical_report')
        .where("medicalReport.uuid = :uuid", { uuid: data.uuid })
        .select([
          'medicalReport.id',
          'medicalReport.uuid',
          'medicalReport.expedient',
          'medicalReport.date',
          'medicalReport.checkIn',
          'medicalReport.checkOut',
          'medicalReport.company',
          'medicalReport.address',
          'medicalReport.phone',
          'medicalReport.patientName',
          'medicalReport.patientAge',
          'medicalReport.patientGender',
          'medicalReport.allergies',
          'medicalReport.transfusions',
          'medicalReport.surgical',
          'medicalReport.immunizations',
          'medicalReport.chronicDegenerative',
          'medicalReport.traumas',
          'medicalReport.patientHeight',
          'medicalReport.patientTemperature',
          'medicalReport.patientCardiacFrequency',
          'medicalReport.patientWeight',
          'medicalReport.bloodPressure',
          'medicalReport.respiratoryRate',
          'medicalReport.oxygen',
          'medicalReport.glucose',
          'medicalReport.currentCondition',
          'medicalReport.headNeck',
          'medicalReport.cardioPulmonary',
          'medicalReport.abdomen',
          'medicalReport.limbs',
          'medicalReport.neurological',
          'medicalReport.others',
          'medicalReport.diagnostic',
          'medicalReport.procedures',
          'medicalReport.antibiotics',
          'medicalReport.labTests',
          'medicalReport.gabinetTests',
          'medicalReport.hospitalReference',
          'medicalReport.ambulanceRide',
          'medicalReport.medicAtTime',
          'medicalReport.medicRespectful',
          'medicalReport.medicClear',
        ])
        .addSelect(`COALESCE(json_agg(
        jsonb_build_object(
          'id', medicalTreatment.id,
          'id_medical_report', medicalTreatment.id_medical_report,
          'treatmentName', medicalTreatment.treatmentName,
        )
      ) FILTER (WHERE medicalTreatment.id IS NOT NULL), '[]')`, 'medicalTreatments')
        .groupBy('medicalReport.id')
        .getRawMany();

      return doctors;
    } catch (error) {
      console.error("Error en readMedicalReport:", error);
      return error;
    }
  }
}