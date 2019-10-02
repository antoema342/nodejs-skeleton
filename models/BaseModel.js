class BaseModel {
    constructor() {

    }
    res(flag, data) {
        return {
            resolved: flag,
            data: data
        }
    }
}
export default BaseModel