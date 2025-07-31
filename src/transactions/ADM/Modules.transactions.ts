import { AppDataSource } from '../../config/connection';
import { Modules } from '../../entity/ADM/Modules';
import { IsNull, Not } from "typeorm";

const modulesRepository = AppDataSource.getRepository(Modules);

export class ModulosTransaction {

  static async obtenerModulos() {
    // Función recursiva para obtener hijos
    const obtenerHijos = async (parentId: number) => {
      const hijos = await modulesRepository.find({
        where: {
          parent_module: parentId,
          active: 1,
          deleted: 0
        },
        order: {
          position: "ASC"
        }
      });

      // Iterar sobre los hijos y obtener sus subniveles
      for (const hijo of hijos) {
        if (hijo.type === 'sub' || hijo.type === 'subchild' || hijo.type === 'subovchild') {
          console.log(hijo.id)
          let type = hijo.type
          hijo[type] = await obtenerHijos(hijo.id); // Llamada recursiva
          console.log(hijo.children)
        }
      }
      return hijos;
    };

    // Obtener los módulos principales (sin padre)
    var data = await modulesRepository.find({
      where: {
        parent_module: IsNull(),
        active: 1,
        deleted: 0
      },
      order: {
        position: 'ASC',
      },
    });

    // Iterar sobre los módulos principales y obtener sus hijos
    for (const element of data) {
      if (element.type === 'sub') {
        element.children = await obtenerHijos(element.id);
      }
    }

    return data;
  }

  /*
  *DIAGRAMA DE NIVELES
  *|
  *|-Link
  *|--Sub
  *| |--Subchild
  *| |  |--Subovchild
  */
  static async crearModules() {
    const dataToInsert = [
      //!Administracion
      //1
      {
        breadcrumb: 'dashboard',
        name: 'Dashboard',
        route: 'dashboard',
        parent_module: null,
        position: 1,
        icon: 'home-outline',
        type: 'link',
      },
      //2
      {
        breadcrumb: 'administracion',
        name: 'Administración',
        route: 'adm',
        parent_module: null,
        position: 2,
        icon: 'library-outline',
        type: 'sub',
      },
      //3
      {
        breadcrumb: 'roles',
        name: 'Roles',
        route: 'adm/roles',
        parent_module: 2,
        position: 1,
        icon: null,
        type: 'link',
      },
      //4
      {
        breadcrumb: 'usuarios',
        name: 'Usuarios',
        route: 'adm/users',
        parent_module: 2,
        position: 2,
        icon: null,
        type: 'link',
      },
      //5
      {
        breadcrumb: 'operadores',
        name: 'Operadores',
        route: 'adm/operators',
        parent_module: 2,
        position: 3,
        icon: null,
        type: 'link',
      },
      //6
      {
        breadcrumb: 'paramedicos',
        name: 'Paramedicos',
        route: 'adm/paramedics',
        parent_module: 2,
        position: 4,
        icon: null,
        type: 'link',
      },
      //7
      {
        breadcrumb: 'doctores',
        name: 'Doctores',
        route: 'adm/doctors',
        parent_module: 2,
        position: 5,
        icon: null,
        type: 'link',
      },
      //8
      {
        breadcrumb: 'unidades',
        name: 'Unidades',
        route: 'adm/units',
        parent_module: 2,
        position: 6,
        icon: null,
        type: 'link',
      },
      //9
      {
        breadcrumb: 'medicines',
        name: 'Medicinas',
        route: 'adm/medicines',
        parent_module: 2,
        position: 7,
        icon: null,
        type: 'link',
      },
      //10
      {
        breadcrumb: 'insurance',
        name: 'Aseguradora',
        route: 'adm/insurance',
        parent_module: 2,
        position: 8,
        icon: null,
        type: 'link',
      },
      //11
      {
        breadcrumb: 'paymentDeliveries',
        name: 'Pago a repartidores',
        route: 'adm/payment-to-delivery-people',
        parent_module: 2,
        position: 9,
        icon: null,
        type: 'link',
      },
      //12
      {
        breadcrumb: 'cashInFlow',
        name: 'Ingreso de fondos',
        route: 'adm/cash-in-flow',
        parent_module: 2,
        position: 10,
        icon: null,
        type: 'link',
      },
      //13
      {
        breadcrumb: 'cxcInsurer',
        name: 'Cobranza a aseguradora',
        route: 'adm/cxc-insurer',
        parent_module: 2,
        position: 11,
        icon: null,
        type: 'link',
      },
      //!Catalogos
      //14
      {
        breadcrumb: 'catalogos',
        name: 'Catalogos',
        route: 'cat',
        parent_module: null,
        position: 3,
        icon: 'book-outline',
        type: 'sub',
      },
      //15
      {
        breadcrumb: 'lugarOcurrencia',
        name: 'Lugar del evento',
        route: 'cat/event-places',
        parent_module: 14,
        position: 1,
        icon: null,
        type: 'link',
      },
      //16
      {
        breadcrumb: 'generos',
        name: 'Generos',
        route: 'cat/genders',
        parent_module: 14,
        position: 2,
        icon: null,
        type: 'link',
      },
      //17
      {
        breadcrumb: 'unidadMedidas',
        name: 'Unidad de medidas',
        route: 'cat/measurement-units',
        parent_module: 14,
        position: 3,
        icon: null,
        type: 'link',
      },
      //18
      {
        breadcrumb: 'categoriasMedicinas',
        name: 'Categorias de medicinas',
        route: 'cat/medicines-categories',
        parent_module: 14,
        position: 4,
        icon: null,
        type: 'link',
      },
      //19
      {
        breadcrumb: 'tipoPagos',
        name: 'Tipo de pagos',
        route: 'cat/payment-types',
        parent_module: 14,
        position: 6,
        icon: null,
        type: 'link',
      },
      //20
      {
        breadcrumb: 'parentesco',
        name: 'Parentescos',
        route: 'cat/relationship',
        parent_module: 14,
        position: 7,
        icon: null,
        type: 'link',
      },
      //21
      {
        breadcrumb: 'derechohabientes',
        name: 'Derechohabiente',
        route: 'cat/rightfuls',
        parent_module: 14,
        position: 8,
        icon: null,
        type: 'link',
      },
      //22
      {
        breadcrumb: 'tipoTraslado',
        name: 'Tipo de traslado',
        route: 'cat/service-transfer',
        parent_module: 14,
        position: 4,
        icon: null,
        type: 'link',
      },
      //23
      {
        breadcrumb: 'tipoServicio',
        name: 'Tipo de servicios',
        route: 'cat/service-types',
        parent_module: 14,
        position: 5,
        icon: null,
        type: 'link',
      },
      //!Eventos
      //24
      {
        breadcrumb: 'eventos',
        name: 'Eventos',
        route: 'ev',
        parent_module: null,
        position: 4,
        icon: 'megaphone-outline',
        type: 'sub',
      },
      //25
      {
        breadcrumb: 'servicioProgramado',
        name: 'Servicio programado',
        route: 'ev/programmed-event',
        parent_module: 24,
        position: 1,
        icon: 'null',
        type: 'link',
      },
      //26
      {
        breadcrumb: 'servicePaper',
        name: 'Hojas de servicio',
        route: 'ev/service-paper',
        parent_module: 24,
        position: 2,
        icon: null,
        type: 'subchild',
      },
      //27
      {
        breadcrumb: 'ambulanceServicePaper',
        name: 'Hoja de servicio de ambulancia',
        route: 'ev/service-paper/ambulance-service-paper',
        parent_module: 26,
        position: 1,
        icon: null,
        type: 'link',
      },
      //28
      {
        breadcrumb: 'medicServicePaper',
        name: 'Hoja de servicio medico a domicilio',
        route: 'ev/service-paper/medic-service-paper',
        parent_module: 26,
        position: 2,
        icon: null,
        type: 'link',
      },
      //29
      {
        breadcrumb: 'verHojaServicio',
        name: 'Hojas de servicio',
        route: 'ev/list-service-records',
        parent_module: 24,
        position: 3,
        icon: null,
        type: 'subchild',
      },
      //30
      {
        breadcrumb: 'hojaServicioAmbulancia',
        name: 'Hojas de servicio ambulancia',
        route: 'ev/list-service-records/ambulance-service-paper',
        parent_module: 29,
        position: 1,
        icon: null,
        type: 'link',
      },
      //31
      {
        breadcrumb: 'hojaServicioMedico',
        name: 'Hojas de servicio medico a domicilio',
        route: 'ev/list-service-records/medic-service-paper',
        parent_module: 29,
        position: 2,
        icon: null,
        type: 'link',
      },
      //32
      {
        breadcrumb: 'serviciosAmbulancia',
        name: 'Servicios de ambulancia',
        route: 'ev/ambulance-services',
        parent_module: 24,
        position: 4,
        icon: null,
        type: 'link',
      },
      //33
      {
        breadcrumb: 'doctorAtHome',
        name: 'Servicio a domicilio',
        route: 'ev/doctor-at-home',
        parent_module: 24,
        position: 5,
        icon: null,
        type: 'link',
      },
      //34
      {
        breadcrumb: 'reportDoctorsAtHome',
        name: 'Reportes de servicio a domicilio',
        route: 'ev/doctor-at-home-reports',
        parent_module: 24,
        position: 6,
        icon: null,
        type: 'link',
      },
      //35
      {
        breadcrumb: 'servicePaperMedicAtHome',
        name: 'Hoja de servicio',
        route: 'ev/doctor-at-home',
        parent_module: 24,
        position: 7,
        icon: null,
        type: 'link',
      },
      //36
      {
        breadcrumb: 'entragaMedicamentos',
        name: 'Entrega de medicamentos',
        route: 'ev/delivery-medications',
        parent_module: 24,
        position: 1,
        icon: null,
        type: 'link',
      },
      //!Redes
      //37
      {
        breadcrumb: 'redes',
        name: 'Redes',
        route: 'red',
        parent_module: null,
        position: 5,
        icon: 'people-outline',
        type: 'sub',
      },
      //38
      {
        breadcrumb: 'repartidores',
        name: 'Repartidores',
        route: 'red/delivers',
        parent_module: 37,
        position: 1,
        icon: null,
        type: 'link',
      },
      //39
      {
        breadcrumb: 'medicos',
        name: 'Medicos',
        route: 'red/medics',
        parent_module: 37,
        position: 2,
        icon: null,
        type: 'link',
      },
      //40
      {
        breadcrumb: 'proveedores',
        name: 'Proveedores',
        route: 'red/suppliers',
        parent_module: 37,
        position: 3,
        icon: null,
        type: 'link',
      },
      //41
      {
        breadcrumb: 'tracking',
        name: 'Rastreo',
        route: 'red/dealer-tracking',
        parent_module: 37,
        position: 3,
        icon: null,
        type: 'link',
      },
    ];
    // Obtén los breadcrumbs existentes
    const existingBreadcrumbs = await AppDataSource
      .getRepository(Modules)
      .createQueryBuilder("module")
      .select("module.breadcrumb")
      .getMany();

    const existingBreadcrumbsSet = new Set(
      existingBreadcrumbs.map((module) => module.breadcrumb)
    );

    // Filtra los datos a insertar
    const filteredData = dataToInsert.filter(
      (item) => !existingBreadcrumbsSet.has(item.breadcrumb)
    );

    if (filteredData.length > 0) {
      return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Modules)
        .values(filteredData)
        .execute();
    }

    return 'módulos creados'
  }

  static async readModules() {
    const modules = await modulesRepository.createQueryBuilder('module')
      .where({
        deleted: 0
      })
      .select([
        'module.id as id',
        'module.name as name',
      ])
      .getRawMany();
    //Retornamos todos los medicines
    return modules;
  }
}