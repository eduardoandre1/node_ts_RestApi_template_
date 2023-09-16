import { DB } from "@/database/postgres";
import repositoryFunctions from "../repositories/repositorie";

function create(name:string):void
{
	if(!name) throw {type: "conflict", message: "must provide a name"};
	repositoryFunctions.create(name)
}
async function read()
{
	const nameList = await repositoryFunctions.read()
	return nameList.rows
}
async function update(oldName: string, newName: string): Promise<void>
{
	if(oldName === newName) throw {type: "conflict", message: "the new name and old name must be different"}
	if(!oldName) throw {type: "incompleteData" , message:"the old name nust be valid"}
	if(!newName) throw {type: "incompleteData" , message:"the new name must be valid"}
	const existName = await repositoryFunctions.readFilterName(oldName)
	if( existName.rowCount === 0) throw {type: "notFound" , message:"this name does not exist"}
	repositoryFunctions.update(oldName, newName)
}
async function deleteService(name: string): Promise<void> 
{
	if(!name) throw {type: "incompleteData", message: "name must be a string not empty"}
	const existName = await repositoryFunctions.readFilterName(name)
	if(existName.rowCount === 0) throw {type: 'notFound', message:"this name does not exist"}
	repositoryFunctions.deleteDatabase(name)
}

const serviçeFunctions = 
{
	create,
	read,
	update,
	deleteService
}
export default serviçeFunctions