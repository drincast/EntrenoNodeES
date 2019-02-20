class User {
    constructor(){
        this.people = [];
    }

    AddPerson(id, name){
        let person = {
            id,
            name
        }

        this.people.push(person);

        return this.people;
    }

    GetPerson(id){
        let person = this.people.filter( p => p.id === id)[0];

        return person;
    }

    GetPeople(){
        return this.people;
    }

    GetPeopleByRoom(room){

    }

    RemovePerson(id){
        let person = this.GetPerson(id);
        this.people = this.people.filter( p => p.id !== id);
        return person;
    }
}

module.exports = {
    User
}