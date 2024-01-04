import { Controller } from 'tsoa'
import { Container, inject, interfaces, decorate, injectable } from 'inversify'
import { autoProvide, fluentProvide, buildProviderModule, provide } from 'inversify-binding-decorators'
import 'reflect-metadata'

// Create a new Container tsoa can use
const iocContainer = new Container()

decorate(injectable(), Controller) // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())

const provideSingleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done()
}

const provideNamed = function <T>(
  identifier: interfaces.ServiceIdentifier<T>,
  name: string
) {
  return fluentProvide(identifier).whenTargetNamed(name).done()
}

export { iocContainer, autoProvide, provide, provideSingleton, provideNamed, inject, decorate, injectable }