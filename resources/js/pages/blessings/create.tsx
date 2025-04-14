import { BlessingType } from '@/types';
import type { PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import store from '@routes/blessings/store';

interface Props extends PageProps {
    blessingTypes: BlessingType[];
}

export default function Create({ blessingTypes }: Props) {
    const { data, setData, submit, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        type: blessingTypes[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(store());
    };

    return (
        <>
            <h1>Create Blessing</h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input className="border" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="slug">Slug</label>
                    <input className="border" id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />
                    {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="border"
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="type">Type</label>
                    <select className="border" id="type" value={data.type} onChange={(e) => setData('type', e.target.value as BlessingType)} required>
                        {blessingTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={processing}>
                        Create Blessing
                    </button>
                </div>
            </form>
        </>
    );
}
