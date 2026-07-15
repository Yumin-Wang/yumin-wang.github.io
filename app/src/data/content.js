// Central content store. Edit copy here — components just render it.

export const profile = {
  name: "Yumin Wang",
  location: "Los Angeles, CA",
  email: "yuminw@usc.edu",
  phone: "(203) 361-6084",
  links: {
    github: "https://github.com/Yumin-Wang",
    scholar: "https://scholar.google.com/citations?hl=en&user=eHd4G2cAAAAJ",
    linkedin: "https://www.linkedin.com/in/yumin-wang-harvard/",
  },
  roleTag: "PhD Candidate · USC · Data Science & Machine Learning",
  headline: "I build statistical and machine learning models that turn massive, messy datasets into reliable decisions.",
  subhead:
    "Data Science & Machine Learning specialist — PhD candidate at USC, trained at Harvard and Yale, with hands-on experience in deep learning, large-scale statistical modeling, and experimentation, backed by a rare depth in applied statistics, biostatistics, and computational biology.",
};

export const heroStats = [
  { value: "1.27M", label: "single cells analyzed", accent: "s1" },
  { value: "126K+", label: "genetic associations mapped", accent: "s2" },
  { value: "3", label: "first-author peer-reviewed papers", accent: "s5" },
  { value: "982", label: "human donors in cohort", accent: "s6" },
];

export const identityPillars = [
  {
    key: "ds",
    title: "Data Science & Machine Learning",
    color: "s1",
    description:
      "Predictive modeling and production-minded ML — deep generative models, CNNs, and NLP, run on GPU-accelerated pipelines processing millions of records at scale.",
    tags: ["Python", "PyTorch / TensorFlow", "Scikit-learn", "Deep Learning", "NLP", "A/B Testing", "Data Pipelines at Scale"],
  },
  {
    key: "stats",
    title: "Statistics & Experimentation",
    color: "s5",
    description:
      "The quantitative rigor behind good product and research decisions — causal inference, experimental design, Bayesian methods, and regression modeling, sharpened by publishing statistical methodology in peer-reviewed journals.",
    tags: ["Causal Inference", "Experimental Design", "Bayesian Statistics", "Regression Modeling", "Survival Analysis", "Propensity Score Methods"],
  },
  {
    key: "genomics",
    title: "Statistical Genetics & Genomics",
    color: "s2",
    description:
      "Additional specialized depth in genome-wide QTL mapping and single-cell transcriptomics, for teams that need it.",
    tags: ["GWAS / eQTL / kQTL", "Single-Cell RNA-seq", "tensorQTL", "Bayesian Colocalization"],
  },
];

export const skillGroups = [
  {
    title: "Machine Learning & Data Science",
    color: "s1",
    items: [
      "Deep Generative Modeling", "Convolutional Neural Networks", "Model Interpretability (Grad-CAM)",
      "Predictive Modeling", "Regression & Classification", "Clustering", "Feature Engineering", "NLP",
    ],
  },
  {
    title: "Statistics & Experimentation",
    color: "s5",
    items: [
      "Causal Inference", "A/B Testing & Experimental Design", "Bayesian Statistics", "Survival Analysis",
      "Propensity Score Methods", "Monte Carlo Simulation", "Longitudinal & Multilevel Modeling", "Power & Sample Size Calculation",
    ],
  },
  {
    title: "Programming & Tools",
    color: "s3",
    items: [
      "Python (NumPy, Pandas, SciPy, Scikit-learn, PyTorch, TensorFlow)", "R (tidyverse, lme4, Bioconductor, Shiny, ggplot2)",
      "SQL", "MATLAB", "Git / Linux", "Tableau / Power BI",
    ],
  },
  {
    title: "Data & Cloud Engineering",
    color: "s8",
    items: [
      "AWS", "Google Cloud Platform", "Apache Spark / Hadoop / Hive", "BigQuery", "PostgreSQL", "DynamoDB / Redshift",
      "ETL Pipelines", "High-Performance Computing",
    ],
  },
  {
    title: "Statistical Genetics & Genomics",
    color: "s2",
    items: ["GWAS / eQTL / kQTL Mapping", "Single-Cell Transcriptomics", "Clinical Trial Design"],
  },
];

export const flagshipProjects = [
  {
    id: "qtl-kinetics",
    kicker: "Current Research · Keck School of Medicine, USC",
    title: "Single-Cell Kinetic QTL Mapping of RNA Transcriptional Dynamics",
    dates: "01/2025 – Present",
    advisor: "Advisor: Prof. Nicholas Mancuso, University of Southern California",
    color: "s1",
    summary:
      "A genome-wide framework linking noncoding genetic variation to the transcriptional and post-transcriptional processes that regulate RNA abundance, at single-cell resolution across the immune system.",
    bullets: [
      "Processed 1.27M PBMC single-cell RNA-seq profiles from 982 donors (OneK1K cohort), generating nascent/mature RNA count matrices with kallisto|bustools for kinetic modeling.",
      "Implemented and optimized biVI, a deep generative model built on the bursty transcription model, on GPU-enabled cloud infrastructure to infer gene- and cell-specific kinetic parameters (burst size, splicing rate, degradation rate).",
      "Built large-scale statistical association pipelines in Python (tensorQTL), testing millions of variant–gene pairs across 18,235 protein-coding genes and 14 immune cell types — identifying 126,294 significant kinetic-QTL associations.",
      "Ran Bayesian colocalization analysis, identifying 6,542 shared causal signals with single-cell eQTLs, and established a mechanistic framework classifying regulatory variants by transcriptional vs. post-transcriptional mechanism.",
    ],
    stats: [
      { value: "1.27M", label: "cells" },
      { value: "982", label: "donors" },
      { value: "14", label: "immune cell types" },
      { value: "126,294", label: "significant kQTLs" },
      { value: "6,542", label: "colocalized signals" },
    ],
    outputs: [
      "Poster, American Society of Human Genetics (ASHG) 2025 Annual Meeting, Boston",
      "Poster, PPHS 2025 Research Symposium, USC",
      "Manuscript in preparation — target submission Nature Genetics, 07/2026",
    ],
    viz: "qtl",
  },
  {
    id: "spec-curve",
    kicker: "Harvard Medical School · Published",
    title: "Grilling the Data: Specification Curve Analysis of Red Meat & All-Cause Mortality",
    dates: "03/2022 – 04/2023",
    advisor: "Advisors: Prof. Chirag Patel & Prof. Dena Zeraatkar, Harvard University",
    color: "s6",
    summary:
      "Nutritional epidemiology is riddled with contradictory headlines because studies quietly make different analytical choices. This project made every plausible choice explicit and ran all of them at once.",
    bullets: [
      "Integrated and curated NHANES, National Death Index, and USDA Food Patterns Equivalent Database records into a longitudinal analytic cohort of 10,661 participants.",
      "Designed a specification curve analysis framework spanning model type, exposure operationalization, covariate adjustment sets, and subgroup definitions.",
      "Built an automated R pipeline (\"specr\") executing 1,208 Cox proportional-hazards models, one per analytic specification, and quantified the vibration of effect in the resulting hazard ratios.",
      "Found only 3.97% of specifications reached statistical significance — evidence that the reported red-meat/mortality association is highly sensitive to arbitrary analytic choices, not a robust signal.",
    ],
    stats: [
      { value: "1,208", label: "model specifications" },
      { value: "10,661", label: "participants" },
      { value: "0.94", label: "median hazard ratio" },
      { value: "3.97%", label: "specifications significant" },
    ],
    outputs: [
      "Published, Journal of Clinical Epidemiology",
      "Published, Current Developments in Nutrition",
      "Poster, NUTRITION 2024 Annual Meeting, Chicago",
      "Media coverage: Yale Insights \"Health & Veritas\" podcast, Medscape, MDedge, Sensible Medicine, and multiple newspapers",
    ],
    viz: "spec-curve",
  },
  {
    id: "prpd",
    kicker: "Yale Center for Analytical Sciences · Published",
    title: "Design & Analysis of Partially Randomized Preference Trials with Propensity Score Stratification",
    dates: "03/2020 – 05/2021",
    advisor: "Advisors: Prof. Denise Esserman & Prof. Fan Li, Yale University",
    color: "s5",
    summary:
      "When patients have strong treatment preferences, forcing full randomization can bias a trial or tank enrollment. This work derives the statistics needed to design trials that respect preference — without giving up causal validity.",
    bullets: [
      "Derived closed-form test statistics and sample-size formulas for treatment, selection, and preference effects under propensity-score-stratified partially randomized preference designs (PSS-PRPD).",
      "Built R simulation pipelines benchmarking estimator bias, variance, Type I error, and power against nominal targets across thousands of trial scenarios.",
      "Stress-tested estimator robustness under small samples, near-positivity violations, and complex confounding structures.",
      "Illustrated the design using the real-world Harapan study and produced recommendations for when PSS-PRPD should replace standard trial designs.",
    ],
    stats: [
      { value: "3", label: "trial designs compared" },
      { value: "1000s", label: "simulated scenarios" },
      { value: "2022", label: "published" },
    ],
    outputs: [
      "Published, Statistical Methods in Medical Research, 2022, 31(8): 1515–1537",
      "Contributed talk, 42nd Society for Clinical Trials Annual Meeting, Chicago",
    ],
    viz: "trial-tree",
  },
];

export const courseProjects = [
  {
    title: "Deep Learning for Musculoskeletal X-ray Classification",
    org: "Harvard University · CSCI-style CV project",
    description:
      "Custom CNN classifying normal vs. abnormal musculoskeletal radiographs on Stanford's MURA dataset; evaluated via ROC-AUC across 7 body sites, with Grad-CAM interpretability heatmaps and robustness checks under image masking.",
    tags: ["PyTorch", "CNNs", "Grad-CAM", "Medical Imaging"],
    color: "s1",
  },
  {
    title: "Interactive COVID-19 Global Metrics Dashboard",
    org: "Harvard University",
    description:
      "Interactive Altair visualization deployed on Streamlit letting users explore case counts, deaths, and reproduction rate by month, year, and country across the pandemic.",
    tags: ["Python", "Altair", "Streamlit"],
    color: "s3",
  },
  {
    title: "Proteomic Analysis of Adipose Exosomes in FABP4-Deficient Mice",
    org: "Harvard University",
    description:
      "Compared exosomal protein profiles between wild-type and FABP4 knockout mice using differential expression, PCA, and K-means clustering, followed by pathway analysis of adipose endocrine signaling.",
    tags: ["R", "PCA", "Clustering", "Pathway Analysis"],
    color: "s2",
  },
  {
    title: "Spatial Analysis of COVID-19 Spread in Connecticut",
    org: "Yale University",
    description:
      "Identified COVID-19 hot spots and positive spatial autocorrelation across CT towns; applied inverse distance weighting and ordinary kriging to predict case counts and evaluate lockdown effectiveness.",
    tags: ["R", "Spatial Statistics", "Kriging"],
    color: "s8",
  },
  {
    title: "Propensity-Score-Matched Study of Acute Appendicitis Treatment",
    org: "Yale University",
    description:
      "Logistic regression before/after propensity-score matching to estimate effects of antibiotic treatment vs. standard appendectomy on 30-day readmission, mortality, and morbidity.",
    tags: ["R", "Causal Inference", "Propensity Matching"],
    color: "s5",
  },
  {
    title: "NBA Player Performance: Multivariate Statistical Analysis",
    org: "Yale University",
    description:
      "PCA and hierarchical clustering on 2019–20 NBA season data; discriminant analysis identified rebounds and assists as the strongest positional differentiators, reaching 70% position-prediction accuracy.",
    tags: ["R", "PCA", "Discriminant Analysis"],
    color: "s7",
  },
];

export const education = [
  {
    school: "University of Southern California",
    degree: "Ph.D., Computational Biology and Bioinformatics",
    detail: "GPA 3.89/4",
    date: "Expected 2028",
    location: "Los Angeles, CA",
  },
  {
    school: "Harvard University",
    degree: "M.S., Biomedical Informatics",
    detail: "GPA 3.87/4",
    date: "03/2023",
    location: "Cambridge, MA",
  },
  {
    school: "Yale University",
    degree: "M.S., Biostatistics — Yale Horstmann Scholarship",
    detail: "GPA 3.93/4",
    date: "06/2021",
    location: "New Haven, CT",
  },
  {
    school: "Beijing Normal University",
    degree: "B.S., Mathematics and Applied Mathematics",
    detail: "GPA 90.28/100",
    date: "07/2018",
    location: "Beijing, China",
  },
];

export const honors = [
  { title: "Rhodes Scholar Semi-Finalist", org: "University of Oxford", date: "2020" },
  { title: "Yale Horstmann Scholarship", org: "Yale University", date: "2019" },
  { title: "Jingshi First-Class Scholarship (Rank 3/171)", org: "Beijing Normal University", date: "2015 & 2016" },
];

export const publications = [
  {
    authors: "Wang Y, Pitre T, Wallach JD, de Souza RJ, Jassal T, Bier D, Patel CJ, Zeraatkar D*",
    title: "Grilling the data: application of specification curve analysis to red meat and all-cause mortality",
    venue: "Journal of Clinical Epidemiology",
    year: "2023",
  },
  {
    authors: "Zeraatkar D, Wang Y, Jassal T, Pitre T, Patel CJ",
    title: "Grilling the Data: Interpreting the Results of Nutritional Epidemiology Studies in the Context of Variation Expected Due to Analytic Flexibility",
    venue: "Current Developments in Nutrition",
    year: "2024",
  },
  {
    authors: "Wang Y, Li F, Blaha O, Meng C, Esserman D*",
    title: "Design and analysis of partially randomized preference trials with propensity score stratification",
    venue: "Statistical Methods in Medical Research, 31(8): 1515–1537",
    year: "2022",
  },
  {
    authors: "Wang Y, et al. (in preparation)",
    title: "Bimodal single-cell QTL mapping of RNA kinetics reveals cell-type-specific genetic regulation of transcriptional dynamics",
    venue: "Target: Nature Genetics",
    year: "2026",
  },
];

export const patents = [
  {
    title: "A type of face mask (thermally regulated, multilayer face mask with detachable cooling source)",
    id: "CN205268853U",
    date: "06/2016",
    note: "Cited as prior art by CN112891771A (granted 2022), which built on this cooling-structure concept.",
  },
];

export const teaching = {
  role: "Teaching Assistant, Department of Mathematics, University of Southern California",
  course: "Math 108 — Contemporary Precalculus",
  date: "01/2025 – 05/2025",
  description:
    "Led twice-weekly discussion sections, developed practice problems, graded exams, and held office hours across functions, trigonometry, analytic geometry, probability, and calculus.",
};
