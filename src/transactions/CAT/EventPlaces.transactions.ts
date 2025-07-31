import { AppDataSource } from '../../config/connection';
import { EventPlaces } from '../../entity/CAT/EventPlaces';
import { v4 as uuidv4 } from 'uuid';
import { EventPlacesHistory } from '../../entity/CAT/EventPlacesHistory';

const eventPlacesRepository = AppDataSource.getRepository(EventPlaces);
const eventPlacesHistoryRepository = AppDataSource.getRepository(EventPlacesHistory);

export class EventPlaceTransactions {

  static async createEventPlace(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewEventPlace = await eventPlacesRepository.save(data)
      const eventPlace = await this.readEventPlace(nuewEventPlace)
      //Retornamos el resultado del insertado de registro
      return eventPlace
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readEventPlaces() {
    try {
      //Buscamos y obtenemos todos los eventPlace
      const eventPlace = await eventPlacesRepository.createQueryBuilder('eventPlace')
        .where({
          deleted: 0
        })
        .select([
          'eventPlace.id as id',
          'eventPlace.uuid as uuid',
          'eventPlace.name as name',
          'eventPlace.active as active',
        ])
        .getRawMany();
      //Retornamos todos los eventPlace
      return eventPlace;
    } catch (error) {
      return error
    }
  }

  static async readEventPlace(data: EventPlaces) {
    try {
      //Buscamos y obtenemos el eventPlace
      const eventPlace = await eventPlacesRepository.createQueryBuilder('eventPlace')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'eventPlace.id as id',
          'eventPlace.uuid as uuid',
          'eventPlace.name as name',
          'eventPlace.active as active',
        ])
        .getRawOne();
      //Retornamos el eventPlace encontrado
      return eventPlace;
    } catch (error) {
      return error
    }
  }

  static async updateEventPlace(data: EventPlaces) {
    try {
      await this.readToUpdate(data);
      await eventPlacesRepository.update({ uuid: data.uuid }, data);
      const eventPlace = await this.readEventPlace(data)
      return eventPlace;
    } catch (error) {
      return error;
    }
  }

  static async disableEventPlace(data: EventPlaces) {
    try {
      await this.readToUpdate(data);
      await eventPlacesRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const eventPlace = await this.readEventPlace(data)
      return eventPlace;
    } catch (error) {
      return error;
    }
  }

  static async enableEventPlace(data: EventPlaces) {
    try {
      await this.readToUpdate(data);
      await this.readToUpdate(data);
      await eventPlacesRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const eventPlace = await this.readEventPlace(data)
      return eventPlace;
    } catch (error) {
      return error;
    }
  }

  static async deleteEventPlace(data: EventPlaces) {
    try {
      await this.readToUpdate(data);
      await eventPlacesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const eventPlace = await this.readEventPlace(data)
      return eventPlace;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const eventPlace = await this.readEventPlace(data)
    let uuid = uuidv4();
    let eventPlaceHistory = {
      uuid: uuid,
      id_event_place: eventPlace.id,
      name: eventPlace.name,
      updated_by: data.updated_by,
    }
    return await eventPlacesHistoryRepository.save(eventPlaceHistory)
  }

}