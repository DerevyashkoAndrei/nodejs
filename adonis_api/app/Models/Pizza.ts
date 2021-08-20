import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pizza extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  public static getList() {
    return Database.from('pizza').select('*')
  }
  public static getById(id: number) {
    return Database.from('pizza').select('*').where('id', id)
  }
  public static updateById(id: number, name: string) {
    return Database.from('pizza').update('name', name).where('id', id)
  }
  public static removeById(id: number) {
    return Database.from('pizza').delete().where('id', id)
  }
}
