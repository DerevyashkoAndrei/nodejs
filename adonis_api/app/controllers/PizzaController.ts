import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pizza from 'App/Models/Pizza'

export default class PizzaController {
  public async index() {
    return await Pizza.getList()
  }
  public async create(ctx: HttpContextContract) {
    const pizza = new Pizza()
    pizza.name = ctx.request.body().name
    return await pizza.save()
  }
  public async show(ctx: HttpContextContract) {
    return await Pizza.getById(ctx.request.param('id'))
  }
  public async update(ctx: HttpContextContract) {
    return await Pizza.updateById(ctx.request.param('id'), ctx.request.body().name)
  }
  public async destroy(ctx: HttpContextContract) {
    return await Pizza.removeById(ctx.request.param('id'))
  }
}
