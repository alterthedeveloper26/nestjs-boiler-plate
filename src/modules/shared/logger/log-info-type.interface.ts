//Constructs an object type whose property
//keys are Keys and whose property values are Type
export interface CommonInfo extends Record<string, unknown> {
  correlationId?: string;
}

export interface RequestInfo<T = Record<string, unknown>> extends CommonInfo {
  serviceName?: string;
  fromIp?: string;
  receivedAt?: number;
  method?: string;
  durations?: number;
  data?: T;
}

export interface EventInfo extends CommonInfo {
  serviceName?: string;
  receivedAt?: string;
  eventName?: string;
  data?: Record<string, unknown>;
}
