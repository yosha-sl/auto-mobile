import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        console.log('Getting message', payload);
        this.server.emit('msgToClient', payload);
    }
    afterInit(server: Server) {
        this.logger.log('Init');
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client: Socket, ...args: any[]) {
        
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('joinToAlert')
    createConnection(client: Socket, uuid: string): void {
        console.log('Register to alert', uuid);
        client.join(uuid);
    }

    @SubscribeMessage('joinToCSVGen')
    createConnectionForCSVGen(client: Socket, uuid: string): void {
        console.log('Register to Gen CSV', uuid);
        client.join(uuid);
    }


    // @SubscribeMessage('alert')
    // sendAlert(client: Socket, uuid: string): void {
    //     console.log('Send Alert', uuid);
    //     this.server.to(uuid).emit('msgToClient');
    // }

    notifyUserToTranformationCompleted(uuid:string): void {
        this.server.to(uuid).emit('msgToClient');
    }

    sendUserToCSV(uuid:string, data): void {
        this.server.to(uuid).emit('csvSource', data);
    }


}