export interface IImageInterface {
    id: string,
    image: string,
    customer_code: string,
    measure_datetime: string,
    measure_value: number,
    measure_type: string,
    isConfirmed: boolean,
    createdAt: Date,
    updatedAt: Date
};

export interface IImageCreate {
    image: string,
    customer_code: string,
    measure_datetime: string,
    measure_value: number,
    measure_type: string,
};

export interface IConfirmCreationData {
    measure_uuid: "string",
    confirmed_value: number
}

export interface IError {
    error_code:string,
    error_description: string
}

export interface IGetUser {
    customerCode: string,
    query: any
}

export interface IMethodsRepositoryImage {
    create(data:IImageCreate): Promise<IImageInterface>;
    patch(data:IConfirmCreationData): Promise<IImageInterface>
    get(code:IGetUser):Promise<IImageInterface[]>
    deleteId(id:string):Promise<IImageInterface>
}