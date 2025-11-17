import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// --- CORRECTED IMPORTS BELOW ---
import Header from '../../components/ui/Header.jsx';
import WalletHeader from "../../components/WalletHeader.jsx";
import FilterControls from './components/FilterControls.jsx';
import CertificateCard from './components/CertificateCard.jsx';
import ShareModal from './components/ShareModal.jsx';
import "../../components/AppIcon.jsx" 
import Icon from '../../components/AppIcon.jsx';
import Button from '../../components/ui/Button.jsx';
// --- END CORRECTED IMPORTS ---

const LearnerWallet = () => {
    const navigate = useNavigate();
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [filteredCertificates, setFilteredCertificates] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('date');
    const [isLoading, setIsLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const handleResetFilters = () => {
        setFilters({});
        setSortBy('date');
    };

    // Mock certificates data (omitted for brevity)
    const mockCertificates = [
        { /* ... */ },
        { /* ... */ },
        { /* ... */ },
        { /* ... */ },
        { /* ... */ }
    ];

    // Translations (omitted for brevity)
    const translations = { /* ... */ };
    const t = translations?.[currentLanguage];

    useEffect(() => {
        // Load preferences and certificates
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        setCurrentLanguage(savedLanguage);
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedDarkMode);
        loadCertificates();
    }, []);

    useEffect(() => {
        // Apply filters and sorting
        let filtered = [...certificates];

        // Apply search filter
        if (filters?.search) {
            filtered = filtered.filter((cert) => // CHANGED: removed ?.
                cert?.courseName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                cert?.institution?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                cert?.skills?.some((skill) => skill?.toLowerCase()?.includes(filters?.search?.toLowerCase()))
            );
        }

        // Apply institution filter
        if (filters?.institution) {
            filtered = filtered.filter((cert) => // CHANGED: removed ?.
                cert?.institution?.toLowerCase()?.includes(filters?.institution?.toLowerCase())
            );
        }

        // Apply category filter (based on skills)
        if (filters?.category) {
            const categoryMap = {
                'programming': ['React', 'JavaScript', 'Python', 'Node.js', 'HTML', 'CSS'],
                'data-science': ['Machine Learning', 'Data Analysis', 'Pandas', 'Python'],
                'web-development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
                'digital-marketing': ['SEO', 'Social Media Marketing', 'Google Ads'],
                'cybersecurity': ['Network Security', 'Ethical Hacking', 'Risk Assessment']
            };

            const categorySkills = categoryMap?.[filters?.category] || [];
            filtered = filtered.filter((cert) => // CHANGED: removed ?.
                cert?.skills?.some((skill) =>
                    categorySkills?.some((catSkill) =>
                        skill?.toLowerCase()?.includes(catSkill?.toLowerCase())
                    )
                )
            );
        }

        // Apply status filter
        if (filters?.status) {
            filtered = filtered.filter((cert) => cert?.status === filters?.status); // CHANGED: removed ?.
        }

        // Apply sorting (uses a cloned array for sort to maintain immutability principle)
        const sorted = [...filtered].sort((a, b) => { // CHANGED: added new array clone and assigned to 'sorted'
            switch (sortBy) {
                case 'date':
                    return new Date(b.completionDate) - new Date(a.completionDate);
                case 'date_asc':
                    return new Date(a.completionDate) - new Date(b.completionDate);
                case 'name':
                    return a?.courseName?.localeCompare(b?.courseName);
                case 'institution':
                    return a?.institution?.localeCompare(b?.institution);
                default:
                    return 0;
            }
        });

        setFilteredCertificates(sorted); // CHANGED: setting 'sorted' array
    }, [certificates, filters, sortBy]);

    const loadCertificates = async () => { /* ... */ };
    const handleLanguageToggle = () => { /* ... */ };
    const handleDarkModeToggle = () => { /* ... */ };
    const handleShare = (certificate) => { /* ... */ };
    const handleDownload = (certificate) => { /* ... */ };
    const handleViewDetails = (certificate) => { /* ... */ };
    const handleGenerateQR = (certificate) => { /* ... */ };
    const getWalletStats = () => { /* ... */ };

    const stats = getWalletStats();

    return (
        <div className={`min-h-screen bg-gray-50 ${isDarkMode ? 'dark' : ''}`}>
            {/* ... rest of the component JSX ... */}
        </div>);
};

export default LearnerWallet;