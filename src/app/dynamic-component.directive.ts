import {ComponentFactoryResolver, Directive, Inject, Injector, Input, OnInit, ViewContainerRef} from "@angular/core";
import {ComponentDataService} from "./component-data.service";
import {COMPONENTS} from "./cms-token";

@Directive({
  selector: '[dynamicComponent]',
  standalone: true
})
export class DynamicComponentDirective implements OnInit {
  @Input('dynamicComponent') componentData: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(COMPONENTS) private components: any[]
  ) {
  }

  ngOnInit() {
    const componentMap = Object.assign({}, ...this.components);
    const componentType = componentMap[this.componentData.flexType ?? this.componentData.typeCode];
    if (componentType) {
      const injector = Injector.create({
        providers: [
          {
            provide: ComponentDataService,
            useFactory: () => {
              const service = new ComponentDataService();
              service.setData(this.componentData);
              return service;
            }
          }
        ]
      });
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.viewContainerRef.createComponent(factory, undefined, injector);
    }
  }
}
