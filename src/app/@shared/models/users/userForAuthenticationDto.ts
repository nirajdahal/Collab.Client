export interface UserForAuthenticationDto {
    email: string;
    password: string;
    clientURI: string ;
}

export interface LoginResponse
{
    token: string
    isAuthenticationSuccesfull:boolean
}

