import { AppDataSource } from '../../config/connection';
import { PermissionModuleUser } from '../../entity/ADM/PermissionModuleUser';
import { ModulesUsersAccess } from './../../entity/ADM/ModulesUsersAccess';

const accesoModulosRepository = AppDataSource.getRepository(ModulesUsersAccess);
const permissionModulosRepository = AppDataSource.getRepository(PermissionModuleUser);

export class usuarioAccesosTransactions {

	static async crearAccesoModulosEmpresaSA(data: any) {
		try {
			//Ingresamos los datos del nuevo registro
			const repartidor = await accesoModulosRepository.insert(data)
			//Retornamos el resultado del insertado de registro
			return repartidor
		} catch (error) {
			//Obtener y enviar el error
			return 'error'
		}
	}

	static async updateModules(data: any) {
		try {
			// Separar los módulos y permisos del JSON
			const modules = Object.entries(data.id_module).filter(([key, value]) => !key.includes('_permissions') && value);
			const permissions = Object.entries(data.id_module).filter(([key]) => key.includes('_permissions'));
			// Eliminar módulos existentes para el usuario
			await accesoModulosRepository
				.createQueryBuilder('modulo')
				.delete()
				.where({ id_user: data.id_user })
				.execute();


			await permissionModulosRepository
				.createQueryBuilder('permission')
				.delete()
				.where({ id_user: data.id_user })
				.execute();

			// Guardar nuevos módulos y sus permisos
			for (const [moduleKey] of modules) {
				const moduleId = parseInt(moduleKey, 10);

				// Guardar acceso al módulo
				const moduleAccess = {
					id_user: { id: data.id_user },
					id_module: { id: moduleId }
				};
				await accesoModulosRepository.save(moduleAccess);

				// Verificar si hay permisos para este módulo
				const permissionKey = `${moduleId}_permissions`;
				const permission = permissions.find(([key]) => key === permissionKey);
				if (permission != undefined) {
					const [_, permissionValue] = permission;
					const permissionData = {
						id_user: { id: data.id_user },
						id_module: { id: moduleId },
						id_permission: permissionValue
					};
					await permissionModulosRepository.save(permissionData);
				}

			}

			return 'ok';
		} catch (error) {
			console.error('Error al actualizar los módulos:', error);
			return 'error';
		}
	}

	static async readCurrentModules(data: any) {
		try {
			let moduleAccess = await accesoModulosRepository
				.createQueryBuilder('modulo')
				.where({ id_user: data.id_user })
				.getRawMany();

			let modulePermissionAccess = await permissionModulosRepository
				.createQueryBuilder('permissions')
				.where({ id_user: data.id_user })
				.getRawMany();

			let objModules = {};

			for (const module of moduleAccess) {
				objModules[module.modulo_id_module] = true;
			}

			for (const permissionModule of modulePermissionAccess) {
				objModules[`${permissionModule.permissions_id_module}_permissions`] = permissionModule.permissions_id_permission;
			}
			return objModules;
		} catch (error) {
			return 'error';
		}
	}

}