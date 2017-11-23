
export class Users {


    static fromJsonList(array): Users[] {
        return array.map(Users.fromJson);
    }

    static fromJson({$key, name , gender , status , dp , age}): Users {
        // console.log('new user for dashboard     ', $key, name , gender , status , dp , age);
        return new Users($key, name , gender , status , dp , age);
    }

    constructor(public $key: string,
                public name: string,
                public gender: string,
                public status: string,
                public dp: string,
                public age: number) {
    }
}
