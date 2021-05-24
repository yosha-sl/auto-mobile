import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
const socketClusterClient = require('socketcluster-client');

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    socket;

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor() {
        this.initSocketCluster();
    }

    async initSocketCluster() {
        this.socket = await socketClusterClient.create({
            hostname: 'localhost',
            port: 8000
        });
    }

    notifyUserToTranformationCompleted(uuid: string, message): void {
        this.socket.transmitPublish(uuid, message);
    }


    


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

    

    sendUserToCSV(uuid: string, data): void {
        this.server.to(uuid).emit('csvSource', data);
    }


}