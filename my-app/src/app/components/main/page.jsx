"use client"
import React, { useState } from 'react';
import { copyS3Bucket } from '../server';
export default function HomeComponent() {
    const [sourceAccount, setSourceAccount] = useState({
        secretId: '',
        secretKey: '',
        region: '',
        bucketName: ''
    });
    const [destinationAccount, setDestinationAccount] = useState({
        secretId: '',
        secretKey: '',
        region: '',
        bucketName: ''
    });
    const handleSourceChange = (e) => {
        const { name, value } = e.target;
        setSourceAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDestinationChange = (e) => {
        const { name, value } = e.target;
        setDestinationAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleMigrate = async () => {
        if (!Object.values(sourceAccount).every(Boolean) || !Object.values(destinationAccount).every(Boolean)) {
            alert('Please fill in all the fields.');
            return;
        }
        try {
            await copyS3Bucket(sourceAccount, destinationAccount);
            alert('Migration successful.');
        } catch (error) {
            console.error(`Error during migration: ${error}`);
            alert('Failed to migrate. Please check the console for errors.');
        }
    };
    return (
        <>
            <div className="main-container">
                <div>
                    <h1 className="main-heading">From AWS Ac-1</h1>
                    <div className="sub-container">
                        <input type="text" name="secretId" placeholder="AWS Secreat ID" value={sourceAccount.secretId} onChange={handleSourceChange} />
                        <input type="text" name="secretKey" placeholder="AWS Secreat Key" value={sourceAccount.secretKey} onChange={handleSourceChange} />
                        <input type="text" name="region" placeholder="S3 Bucket Region" value={sourceAccount.region} onChange={handleSourceChange} />
                        <input type="text" name="bucketName" placeholder="Bucket Name" value={sourceAccount.bucketName} onChange={handleSourceChange} />
                    </div>
                </div>
                <div>
                    <h1 className="main-heading">To AWS Ac-2</h1>
                    <div className="sub-container">
                        <input type="text" name="secretId" placeholder="AWS Secreat ID" value={destinationAccount.secretId} onChange={handleDestinationChange} />
                        <input type="text" name="secretKey" placeholder="AWS Secreat Key" value={destinationAccount.secretKey} onChange={handleDestinationChange} />
                        <input type="text" name="region" placeholder="S3 Bucket Region" value={destinationAccount.region} onChange={handleDestinationChange} />
                        <input type="text" name="bucketName" placeholder="Bucket Name" value={destinationAccount.bucketName} onChange={handleDestinationChange} />
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                <button className="migrate-button" onClick={handleMigrate}>Migrate Now</button>
            </div>
        </>
    );
}  