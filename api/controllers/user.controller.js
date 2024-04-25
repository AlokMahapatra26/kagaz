export const signup = (req,res) => {
    console.log(req.body)
}

export const signin = (req,res) => {
    res.status(200).json({"message" : "signin"})
}

export const userdetail = (req,res) => {
    res.status(200).json({"message" : "userdetail"})
}