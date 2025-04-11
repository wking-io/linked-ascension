import { store } from '@actions/App/Http/Controllers/GameController';
import { useForm } from '@inertiajs/react';
import format from 'date-fns/format';
import { ChangeEvent, FormEvent } from 'react';

export default function Create() {
    const { data, setData, submit, processing, errors } = useForm({
        name: '',
        starts_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        ends_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(store());
    };

    return (
        <div className="flex flex-1 flex-col">
            <h1>Create New Game</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                            placeholder="Enter game name"
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <label>Starts At</label>
                        <input
                            type="datetime-local"
                            value={data.starts_at}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('starts_at', e.target.value)}
                        />
                        {errors.starts_at && <p>{errors.starts_at}</p>}
                    </div>

                    <div>
                        <label>Ends At</label>
                        <input
                            type="datetime-local"
                            value={data.ends_at}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('ends_at', e.target.value)}
                        />
                        {errors.ends_at && <p>{errors.ends_at}</p>}
                    </div>

                    <button type="submit" disabled={processing}>
                        Create Game
                    </button>
                </div>
            </form>
        </div>
    );
}
