export class Message {
    static fromJsonList(array): Message[] {
        return array.map(Message.fromJson);
    }

    static fromJson({from , to , message , time}): Message {
        // console.log('new mesaage', from , to , message , time);
        return new Message(from , to , message , time);
    }

    constructor(public from: string,
                public to: string,
                public message: string,
                public time: string) {
    }
}
