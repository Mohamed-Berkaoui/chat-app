function asyncHandler(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next)

        } catch (error) {
            return next(error)
        }

    }
}
export default asyncHandler