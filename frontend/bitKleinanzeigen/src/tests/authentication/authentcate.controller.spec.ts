import{User}from '../../app/model/user/user.model'


describe('AuthenticationController', () =>{

  beforeEach(() =>{

  })

  it('should authenticate a valid user',()=>{
    const user:User=new User();
    user.password="123";
    user.username="akessler";

  })
})
