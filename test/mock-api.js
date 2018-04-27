import fetchMock from 'fetch-mock'

const statusRoute = {
  name: 'Status',
  method: 'GET',
  matcher: /\/status\/$/,
  response: {
    headers: {
      'content-type': 'application/json'
    },
    body: {
      couchdb: 'ok'
    }
  }
}

const ROUTES = [
  {
    name: 'GetDoc',
    method: 'GET',
    matcher: /\/data\/io.cozy.testobject\/42$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        _id: '42',
        _rev: '1-5444878785445',
        test: 'value'
      }
    }
  },
  {
    name: 'GetManyDocs',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_all_docs/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        total_rows: 2,
        rows: [
          {
            id: '42',
            key: '42',
            value: {
              rev: '1-5444878785445'
            },
            doc: {
              _id: '42',
              _rev: '1-5444878785445',
              test: 'value'
            }
          },
          {
            key: '43',
            error: 'not_found'
          }
        ]
      }
    }
  },
  {
    name: 'GetAllDocs',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_all_docs/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        total_rows: 2,
        rows: [
          {
            id: '42',
            key: '42',
            value: {
              rev: '1-5444878785445'
            },
            doc: {
              _id: '42',
              _rev: '1-5444878785445',
              test: 'value'
            }
          },
          {
            id: '43',
            key: '43',
            value: {
              rev: '1-5444878785446'
            },
            doc: {
              _id: '43',
              _rev: '1-5444878785446',
              test: 'value2'
            }
          }
        ]
      }
    }
  },
  {
    name: 'CreateDoc',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        _id: '42',
        _rev: '1-5444878785445',
        data: {
          _id: '42',
          _rev: '1-5444878785445',
          test: 'value'
        }
      }
    }
  },
  {
    name: 'ChangesFeed',
    method: 'GET',
    matcher: /\/data\/io.cozy.testobject\/_changes\?since=0$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        last_seq: '42-abcdef',
        pending: 0,
        results: [
          {
            id: 'e2914a852e49f767263859c42201606e',
            seq: '42-abcdef',
            doc: null,
            changes: [{ rev: '1-9cc26943123556f6b91408d885383aa7' }]
          }
        ]
      }
    }
  },
  {
    name: 'UpdateDoc',
    method: 'PUT',
    matcher: /\/data\/io.cozy.testobject\/42$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        _id: '42',
        _rev: '2-5444878785445',
        data: {
          _id: '42',
          _rev: '2-5444878785445',
          test: 'value2'
        }
      }
    }
  },
  {
    name: 'DeleteDoc',
    method: 'DELETE',
    matcher: /\/data\/io.cozy.testobject\/42\?rev=1-5444878785445$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        id: '42',
        rev: '1-5444878785445'
      }
    }
  },
  {
    name: 'CreateIndex',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_index$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        id: '_design/generatedindexname',
        name: 'generatedindexname',
        result: 'created'
      }
    }
  },
  {
    name: 'FindDocuments',
    method: 'POST',
    matcher: /\/data\/io.cozy.testobject\/_find$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        docs: [{ _id: '42', test: 'value' }, { _id: '43', test: 'value' }]
      }
    }
  },
  {
    name: 'UploadFile',
    method: 'POST',
    matcher: /\/files\/.*Type=file.*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'file',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            size: '0',
            md5sum: '1B2M2Y8AsgTpgAmY7PhCfg==',
            mime: 'application/pdf',
            class: 'application',
            executable: false,
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'UpdateFile',
    method: 'PUT',
    matcher: /\/files\/[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'file',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            size: '0',
            md5sum: '1B2M2Y8AsgTpgAmY7PhCfg==',
            mime: 'application/pdf',
            class: 'application',
            executable: false,
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'CreateDirectory',
    method: 'POST',
    matcher: /\/files\/.*Type=directory.*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'directory',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'Trash',
    method: 'DELETE',
    matcher: /\/files\/[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'directory',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'UpdateAttributes',
    method: 'PATCH',
    matcher: /\/files\/[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'directory',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'StatByPath',
    method: 'GET',
    matcher: /\/files\/metadata[^/]*$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'cb1c159a8db1ee7aeb9441c3ff001753',
          attributes: {
            type: 'file',
            name: 'hospi.pdf',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'StatByID',
    method: 'GET',
    matcher: /\/files\/id42$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.files',
          id: 'id42',
          attributes: {
            type: 'directory',
            name: 'bills',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2016-11-25T16:07:45.398867198+01:00',
            updated_at: '2016-11-25T16:07:45.398867198+01:00',
            tags: []
          },
          meta: {},
          links: {},
          relationships: {}
        }
      }
    }
  },
  {
    name: 'DownloadByID',
    method: 'GET',
    matcher: /\/files\/download\/id42$/,
    response: 'foo'
  },
  {
    name: 'DownloadByPath',
    method: 'GET',
    matcher: /\/files\/download\?Path=.*$/,
    response: 'foo'
  },
  {
    name: 'GetDownloadLinkById',
    method: 'POST',
    matcher: /\/files\/downloads\?Id=id42/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        links: {
          related: 'http://my.cozy.io/files/downloads/secret42/foo'
        }
      }
    }
  },
  {
    name: 'GetDownloadLinkByPath',
    method: 'POST',
    matcher: /\/files\/downloads\?Path=.*$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        links: {
          related: 'http://my.cozy.io/files/downloads/secret42/foo'
        }
      }
    }
  },
  {
    name: 'AuthRegisterClient',
    method: 'POST',
    matcher: /\/auth\/register$/,
    response: (url, opts) => {
      const body = Object.assign(JSON.parse(opts.body), {
        client_id: '123',
        client_secret: '456',
        registration_access_token: '789'
      })
      return {
        headers: {
          'content-type': 'application/json'
        },
        body: body
      }
    }
  },
  {
    name: 'AuthGetClient',
    method: 'GET',
    matcher: /\/auth\/register\/123$/,
    response: () => {
      const body = {
        client_id: '123',
        client_secret: '456',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client'
      }
      return {
        headers: {
          'content-type': 'application/json'
        },
        body: body
      }
    }
  },
  {
    name: 'RefreshToken',
    method: 'POST',
    matcher: /\/auth\/access_token$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        token_type: 'Bearer',
        access_token: '124',
        scope: 'a b'
      }
    }
  },
  {
    name: 'AccessToken',
    method: 'POST',
    matcher: /\/auth\/access_token$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        token_type: 'Bearer',
        access_token: '123',
        refresh_token: '456',
        scope: 'a b'
      }
    }
  },
  {
    name: 'UpdateClient',
    method: 'PUT',
    matcher: /auth\/register\/123$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        client_id: '123',
        client_secret: '456',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client',
        logo_uri: '321'
      }
    }
  },
  {
    name: 'ResetClientToken',
    method: 'PUT',
    matcher: /auth\/register\/123$/,
    response: {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        client_id: '123',
        client_secret: '654',
        redirect_uris: ['http://coucou/'],
        software_id: 'id',
        client_name: 'client',
        logo_uri: '321'
      }
    }
  },
  {
    name: 'UnregisterClient',
    method: 'DELETE',
    matcher: /auth\/register\/123$/,
    response: { body: '' }
  },
  {
    name: 'DiskUsage',
    method: 'GET',
    matcher: /settings\/disk-usage$/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.settings',
          id: 'io.cozy.settings.disk-usage',
          attributes: {
            used: '123'
          },
          meta: {},
          links: {
            self: '/settings/disk-usage'
          }
        }
      }
    }
  },
  {
    name: 'Passphrase',
    method: 'PUT',
    matcher: /settings\/passphrase/,
    response: { body: '' }
  },
  {
    name: 'GetInstance',
    method: 'GET',
    matcher: /settings\/instance/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.settings',
          id: 'io.cozy.settings.instance',
          meta: {
            rev: '1'
          },
          attributes: {
            locale: 'fr',
            email: 'alice@example.com',
            public_name: 'Alice Martin'
          }
        }
      }
    }
  },
  {
    name: 'UpdateInstance',
    method: 'PUT',
    matcher: /settings\/instance/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: 'io.cozy.settings',
          id: 'io.cozy.settings.instance',
          meta: {
            rev: '2'
          },
          attributes: {
            locale: 'en',
            email: 'alice@example.com',
            public_name: 'Alice Martin'
          }
        }
      }
    }
  },
  {
    name: 'GetClients',
    method: 'GET',
    matcher: /settings\/clients/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: [
          {
            type: 'io.cozy.oauth.clients',
            id: '30e84c10-e6cf-11e6-9bfd-a7106972de51',
            attributes: {
              redirect_uris: ['http://localhost:4000/oauth/callback'],
              client_name: 'Cozy-Desktop on my-new-laptop',
              client_kind: 'desktop',
              client_uri: 'https://docs.cozy.io/en/mobile/desktop.html',
              logo_uri: 'https://docs.cozy.io/assets/images/cozy-logo-docs.svg',
              policy_uri: 'https://cozy.io/policy',
              software_id: '/github.com/cozy-labs/cozy-desktop',
              software_version: '0.16.0'
            },
            links: {
              self: '/settings/clients/30e84c10-e6cf-11e6-9bfd-a7106972de51'
            }
          }
        ]
      }
    }
  },
  {
    name: 'DeleteClient',
    method: 'DELETE',
    matcher: /settings\/clients\/123/,
    response: { body: '' }
  },
  {
    name: 'SyncedClient',
    method: 'POST',
    matcher: /settings\/synchronized/,
    response: { body: '' }
  },
  {
    name: 'CreateIntent',
    method: 'POST',
    matcher: /intents/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          id: '77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
          type: 'io.cozy.intents',
          attributes: {
            action: 'PICK',
            type: 'io.cozy.files',
            permissions: ['GET'],
            client: 'contacts.cozy.example.net',
            services: [
              {
                slug: 'files',
                href:
                  'https://files.cozy.example.net/pick?intent=77bcc42c-0fd8-11e7-ac95-8f605f6e8338'
              }
            ]
          },
          links: {
            self: '/intents/77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
            permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
          }
        }
      }
    }
  },
  {
    name: 'CreateComposedIntent',
    method: 'POST',
    matcher: /intents/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          id: '4279db3278734467a1627fbef99a9de1',
          type: 'io.cozy.intents',
          attributes: {
            action: 'INSTALL',
            type: 'io.cozy.apps',
            permissions: ['GET'],
            client: 'contacts.cozy.example.net',
            services: [
              {
                slug: 'store',
                href:
                  'https://store.cozy.example.net/install?intent=4279db3278734467a1627fbef99a9de1'
              }
            ]
          },
          links: {
            self: '/intents/4279db3278734467a1627fbef99a9de1',
            permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
          }
        }
      }
    }
  },
  {
    name: 'CreateIntentWithNoService',
    method: 'POST',
    matcher: /intents/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          id: '77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
          type: 'io.cozy.intents',
          attributes: {
            action: 'PICK',
            type: 'io.cozy.files',
            permissions: ['GET'],
            client: 'contacts.cozy.example.net',
            services: null
          },
          links: {
            self: '/intents/77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
            permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
          }
        }
      }
    }
  },
  {
    name: 'CreateIntentToRedirect',
    method: 'POST',
    matcher: /intents/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          id: '77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
          type: 'io.cozy.intents',
          attributes: {
            action: 'REDIRECT',
            type: 'io.cozy.files',
            permissions: ['GET'],
            client: 'store.cozy.example.net',
            services: [
              {
                slug: 'store',
                href:
                  'https://drive.cozy.example.net/%23/files/?intent=77bcc42c-0fd8-11e7-ac95-8f605f6e8338'
              }
            ]
          },
          links: {
            self: '/intents/77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
            permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
          }
        }
      }
    }
  },
  {
    name: 'GetIntent',
    method: 'GET',
    matcher: /intents/,
    response: {
      headers: {
        'content-type': 'application/vnd.api+json'
      },
      body: {
        data: {
          id: '77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
          type: 'io.cozy.intents',
          attributes: {
            action: 'PICK',
            type: 'io.cozy.files',
            permissions: ['GET'],
            client: 'contacts.cozy.example.net',
            services: [
              {
                slug: 'files',
                href:
                  'https://files.cozy.example.net/pick?intent=77bcc42c-0fd8-11e7-ac95-8f605f6e8338'
              }
            ]
          },
          links: {
            self: '/intents/77bcc42c-0fd8-11e7-ac95-8f605f6e8338',
            permissions: '/permissions/a340d5e0-d647-11e6-b66c-5fc9ce1e17c6'
          }
        }
      }
    }
  }
]

fetchMock.mockAPI = name =>
  function() {
    fetchMock.mock(statusRoute)
    ROUTES.filter(route => route.name === name).forEach(route =>
      fetchMock.mock(route)
    )
  }

export default fetchMock
