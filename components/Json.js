const Json = ({json}) => {
    return (
        <div className="container mx-auto p-6">
            <div className="p-6 bg-gray-200">
                <pre className="whitespace-pre-wrap">
                    {JSON.stringify(json, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default Json