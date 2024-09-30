export const login = async (email, password) => {
    try {
        const res = await fetch('http://localhost:3000/login/login', {
            method: 'POST',
            headers: {
                'content-type': 'Application/json'
            },
            body: JSON.stringify(
                {
                    email,
                    password
                }
            )
        })
    
        const data= await res.json();
        console.log(data)

        return data.user;
    } catch (error) {
        console.error("Something went wrong at login: ", error)
        
    }

}

export const signUp = async (newUser) => {
    try {
        const res = await fetch('http://localhost:3000/login/signUp', {
            method: 'POST',
            headers: {
                'content-type': 'Application/json'
            },
            body: JSON.stringify(
                
                    newUser
                
            )
        })
    
        const data= await res.json();
        console.log('El usuario se registro correctamente')
        return data.user;
    } catch (error) {
        console.error("Something went wrong at registration: ", error)
        
    }
    
}

export const getUserById = async (id) => {

    const res = await fetch(`http://localhost:3000/login/getUserById/${id}`)
    console.log('fecth', res)
    const result = await res.json()
    console.log('parseo objeto resultado ', result)
    return result.user
}


export const updateUser = async(id, updatedUser) => {
    const res = await fetch(`http://localhost:3000/login/update/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'Application/json'
        },
        body: JSON.stringify(
            {
                ...updatedUser
            }
        )
    })
    const result = await res.json()
    return result.user
}

export const deleteUser = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/login/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'Application/json',
            }
        });
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Something went wrong when deleting the user:', error);
    }
};

