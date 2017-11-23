
export class User {

    static fromJsonList(array): User[] {
        return array.map(User.fromJson);
    }

    static fromJson({$key, $value }): User {
        // console.log('new chat', $key, $value );
        return new User($key, $value );
    }

    constructor(public $key: string,
                public $value: string) {
    }
}
