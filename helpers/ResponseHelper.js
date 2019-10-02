class ResponseHelper {
    response(res, status, body) {
        if (status >= 400) {
            let message = {
                status: false,
                meta:{
                    message: body,
                    code: status
                },
                data: 
                    []
                
            }
            res.status(status).json(message)
        } else {
            let message = 
            {
                records: body,
                status:{
                    name: "OK",
                    type: "Notification",
                    message: "Ok"
                }
                // data: body
            }
            res.status(status).json(message)
        }
    }
}
export default new ResponseHelper()