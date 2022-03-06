import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({

    serializers: {
      application: ActiveModelSerializer
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.internet.userName().toLowerCase();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10, new Date());
        }
      })
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = "api"
      this.timing = 750; //toda requisição terá 750 ms.

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams
        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = ""; //resetando namespace, para o next usar a rota "api" padrão dele.
      this.passthrough();
    }
  })

  return server;
}