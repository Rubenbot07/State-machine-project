import { createMachine, assign, fromPromise } from "xstate";
import { getCountries } from "../utils/getCountries";

const fillCountries = {
    initial: "loading",
    states: {
        loading: {
            invoke: {
                id: "getCountries",
                src: fromPromise(() => getCountries()),
                onDone: {
                  target: "success",
                  actions: assign({ countries: ({ event }) => event.output }),
                },
                onError: {
                  target: "failure",
                  actions: assign({ error: "fallo el request" }),
                },
              },
        },
        success: {},
        failure: {
            on: {
                RETRY: { target: "loading" },
            },
        },
    },
}

const bookingMachine = createMachine({
    id: "buy plane ticket",
    initial: "initial",
    context: {
        passengers: [],
        flightCountry: '',
        countries: [],
        error: ''
    },
    states: {
        initial: {
            on: {
                START: {
                    target: "search",
                    actions: "cleanPassengers"
                }
            }
        },
        search: {
            on: {
                CONTINUE: {
                    target: "passengers",
                    actions: assign({
                        flightCountry: ({ event }) => event.flightCountry,
                    })
                },
                CANCEL: "initial",
            },
            ...fillCountries
        },
        passengers: {
            on: {
                DONE: {
                    target: 'tickets',
                    guard: "moreThanOnePassenger"
                },
                CANCEL: "initial",
                ADD: {
                    target: "passengers",
                    actions: assign({
                        passengers: ({ context, event }) => [...context.passengers, event.passenger]
                    })
                }
            }
        },
        tickets: {
            after: {
                5000: {
                    target: "initial",
                    actions: "cleanPassengers",
                }
            },
            on: {
                FINISH: "initial",
            }
        }
    },
},
{
    actions: {
        cleanPassengers: assign({
            passengers: []
        })
    },

    guards: {
        moreThanOnePassenger: ({context}) => {
          return context.passengers.length > 0;
        }
      },
}
)

export default bookingMachine;