export const rabbitMQWrapper =  {
    client: {
        publish: jest
           .fn()
           .mockImplementation((subject:string, data: string, callback: () => void) => {
          
        }),
        assertExchange: jest
           .fn()
           .mockImplementation((subject:string, data: string, callback: () => void) => {
          
        }),
       

    }
}