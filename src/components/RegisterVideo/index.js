import React from "react";
import { StyledRegisterVideo } from "./style";
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm) { //Hook customizado para lidar com o formulario
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    console.log();

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = 'https://mdxmjjkyarvpkaebwdcj.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keG1qamt5YXJ2cGthZWJ3ZGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjQ4NTUsImV4cCI6MTk4Mzk0MDg1NX0.xi8zJVLuqXhsbuPuc14hP09p-pqwdHmSlb8BSKrLCWs';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Sasha Velour - So emotional / Lemon Lab / Chile", url: "https://www.youtube.com/watch?v=rA3Drk02QxY" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ?
                (<form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastro.values);

                    // Contrato entre o nosso Front e o BackEnd
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "LGBTQIAP+",
                     })
                     .then((oqueveio) => {
                        console.log(oqueveio);
                     })
                     .catch((err) => {
                        console.log(err);
                     })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>)
                : false}
        </StyledRegisterVideo>
    )
}