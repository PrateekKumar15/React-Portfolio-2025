import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ items = [], className = '' }) => {
    const location = useLocation();

    // Auto-generate breadcrumbs based on current path if no items provided
    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ label: 'Home', href: '/', icon: <FaHome /> }];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            breadcrumbs.push({
                label,
                href: currentPath,
                isLast: index === pathSegments.length - 1
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs();

    if (breadcrumbs.length <= 1) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center space-x-2 text-sm text-slate-400 mb-6 ${className}`}
            aria-label="Breadcrumb navigation"
        >
            <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
                {breadcrumbs.map((crumb, index) => (
                    <li
                        key={index}
                        className="flex items-center"
                        itemScope
                        itemType="https://schema.org/ListItem"
                        itemProp="itemListElement"
                    >
                        {index > 0 && (
                            <FaChevronRight
                                className="w-3 h-3 mx-2 text-slate-500"
                                aria-hidden="true"
                            />
                        )}

                        {crumb.isLast || index === breadcrumbs.length - 1 ? (
                            <span
                                className="text-slate-300 font-medium"
                                itemProp="name"
                                aria-current="page"
                            >
                                {crumb.icon && <span className="mr-1">{crumb.icon}</span>}
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb.href}
                                className="flex items-center hover:text-indigo-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
                                itemProp="item"
                            >
                                {crumb.icon && <span className="mr-1">{crumb.icon}</span>}
                                <span itemProp="name">{crumb.label}</span>
                            </Link>
                        )}

                        <meta itemProp="position" content={index + 1} />
                    </li>
                ))}
            </ol>
        </motion.nav>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            icon: PropTypes.element,
            isLast: PropTypes.bool,
        })
    ),
    className: PropTypes.string,
};

export default Breadcrumb;
