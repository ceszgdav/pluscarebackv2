import { AppDataSource } from '../../config/connection';
import { Doctors } from '../../entity/ADM/Doctors';
import { DoctorsHistory } from '../../entity/ADM/DoctorsHistory';
import { v4 as uuidv4 } from 'uuid';

const doctorsRepository = AppDataSource.getRepository(Doctors);
const doctorsHistoryRepository = AppDataSource.getRepository(DoctorsHistory);

export class DoctorTransactions {

  static async createDoctor(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewDoctor = await doctorsRepository.save(data)
      const doctors = await this.readDoctor(nuewDoctor)
      //Retornamos el resultado del insertado de registro
      return doctors
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readDoctors() {
    try {
      //Buscamos y obtenemos todos los doctors
      const doctors = await doctorsRepository.createQueryBuilder('doctor')
        .where({
          deleted: 0
        })
        .select([
          'doctor.id as id',
          'doctor.uuid as uuid',
          'doctor.name as name',
          'doctor.phone as phone',
          'doctor.email as email',
          'doctor.professional_id as "professional_id"',
          'doctor.especiality as especiality',
          'doctor.university_degree as "university_degree"',
          'doctor.active as "active"',
        ])
        .getRawMany();
      //Retornamos todos los doctors
      return doctors;
    } catch (error) {
      return error
    }
  }

  static async readDoctor(data: Doctors) {
    try {
      //Buscamos y obtenemos el doctor
      const doctor = await doctorsRepository.createQueryBuilder('doctor')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'doctor.id as id',
          'doctor.uuid as uuid',
          'doctor.name as name',
          'doctor.phone as phone',
          'doctor.email as email',
          'doctor.professional_id as "professional_id"',
          'doctor.especiality as especiality',
          'doctor.university_degree as "university_degree"',
          'doctor.active as "active"',
        ])
        .getRawOne();
      //Retornamos el doctor encontrado
      return doctor;
    } catch (error) {
      return error
    }
  }

  static async updateDoctor(data: Doctors) {
    try {
      const doctor = await this.readDoctor(data)
      let doctorHistory = {
        name: doctor.name,
        email: doctor.email,
        professional_id: doctor.professional_id,
        especiality: doctor.especiality,
        university_degree: doctor.university_degree,
        id_doctor: doctor.id,
        phone: doctor.phone,
        updated_by: data.updated_by,
      }
      await doctorsRepository.update({ uuid: data.uuid }, data);
      await doctorsHistoryRepository.save(doctorHistory)
      let doctorUpdated = await this.readDoctor(data)
      return doctorUpdated;
    } catch (error) {
      return error;
    }
  }

  static async disableDoctor(data: Doctors) {
    try {
      await this.readToUpdate(data)
      await doctorsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      let doctorUpdated = await this.readDoctor(data)
      return doctorUpdated;
    } catch (error) {
      return error;
    }
  }

  static async enableDoctor(data: Doctors) {
    try {
      await this.readToUpdate(data)
      await doctorsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      let doctorUpdated = await this.readDoctor(data)
      return doctorUpdated;
    } catch (error) {
      return error;
    }
  }

  static async deleteDoctor(data: any) {
    try {
      await this.readToUpdate(data)
      await doctorsRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      let doctorUpdated = await this.readDoctor(data)
      return doctorUpdated;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    let doctor = await this.readDoctor(data)
    let uuid = uuidv4();
    let doctorHistory = {
      uuid: uuid,
      name: doctor.name,
      email: doctor.email,
      professional_id: doctor.professional_id,
      especiality: doctor.especiality,
      university_degree: doctor.university_degree,
      id_doctor: doctor.id,
      phone: doctor.phone,
      updated_by: data.updated_by,
    }
    return await doctorsHistoryRepository.save(doctorHistory)
  }

}